import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import DishList from './DishList'
import CreateDishModal from '../modals/CreateDishModal'
import DiscountModal from '../modals/DiscountModal'
import {getCategories} from '../../actions/categoryActions'
import {DISH_MODAL_ID, DISCOUNT_MODAL_ID} from '../../const'
import ModalController from '../../controllers/ModalController'

import {createDish, deleteDish, setActiveDish, updateDiscount} from '../../actions/dishActions'
import {addToCart} from '../../actions/cartActions'

@connect( (store) =>{
	return {category: store.category, dish: store.dish, modal: store.modal, auth: store.auth};
})
export default class DishListComponent extends React.Component{

    constructor(props) {
        super(props);
        this.modalController = new ModalController(this.props.dispatch);

        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.dispatch(getCategories());
    }

    onEditDiscount(id) {
        this.props.dispatch(setActiveDish(id))
        this.modalController.openModal(DISCOUNT_MODAL_ID);
    }

	render(){

        let {user} = this.props.auth;

        let admin = user? user.admin : false
        let modal;
        let discountModal;

        if(admin){
            modal = <CreateDishModal modalId={DISH_MODAL_ID} 
                             categories={this.props.category.categories}
                             onSavePressed={ (data) => this.props.dispatch(createDish(data))}
                                 />

            discountModal = <DiscountModal
                                modalId={DISCOUNT_MODAL_ID}
                                onSave={(data) => this.props.dispatch(updateDiscount(data))}
                                />
        }
		return <div class="row">
           
            {modal}		
            {discountModal} 
			<DishList onAddDish={() => this.modalController.openModal(DISH_MODAL_ID)}
					  items={this.props.dish.dishes}
                      onAddToCart={(id) => this.props.dispatch(addToCart(id))}
                      onDelete={(id) => this.props.dispatch(deleteDish(id))}
                      onEditDiscount={(id) => this.onEditDiscount(id)}
                      admin={admin}
						  />
                      
                    
                      
		</div>
                    
	}

}