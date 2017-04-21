import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import DishList from './DishList'
import CreateDishModal from '../modals/CreateDishModal'
import DiscountModal from '../modals/DiscountModal'
import {getCategories} from '../../actions/categoryActions'
import {DISH_MODAL_ID, DISCOUNT_MODAL_ID} from '../../const'
import { bindActionCreators } from 'redux'
import {createDish, deleteDish, setActiveDish, updateDiscount} from '../../actions/dishActions'
import {addToCart} from '../../actions/cartActions'
import {openModal} from '../../actions/modalActions'


@connect( (store) =>{
	return {category: store.category, dish: store.dish, modal: store.modal, auth: store.auth};
}, dispatch => {
  return {
    loadCategories: bindActionCreators(getCategories, dispatch),
    setActiveDish: bindActionCreators(setActiveDish, dispatch),
    openDiscountModal: bindActionCreators(() => openModal(DISCOUNT_MODAL_ID), dispatch),
    openDishModal: bindActionCreators(() => openModal(DISH_MODAL_ID), dispatch),
    createDish: bindActionCreators(createDish, dispatch),
    updateDiscount: bindActionCreators(updateDiscount, dispatch),
    addToCart: bindActionCreators(addToCart, dispatch),
    deleteDish: bindActionCreators(deleteDish, dispatch)
  }
})
export default class DishListComponent extends React.Component{

    constructor(props) {
        super(props);
        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.loadCategories();
    }

    onEditDiscount(id) {
        this.props.setActiveDish(id);
        this.props.openDiscountModal();
    }

	render(){

        let {user} = this.props.auth;

        let admin = user? user.admin : false
        let modal;
        let discountModal;

        if(admin){
            modal = <CreateDishModal modalId={DISH_MODAL_ID} 
                             categories={this.props.category.categories}
                             onSavePressed={ (data) => this.props.createDish(data)}
                                 />

            discountModal = <DiscountModal
                                modalId={DISCOUNT_MODAL_ID}
                                onSave={(data) => this.props.updateDiscount(data)}
                                />
        }
		return <div class="row">
           
            {modal}		
            {discountModal} 
			<DishList onAddDish={() => this.props.openDishModal()}
					      items={this.props.dish.dishes}
                onAddToCart={(id) => this.props.addToCart(id)}
                onDelete={(id) => this.props.deleteDish(id)}
                onEditDiscount={(id) => this.onEditDiscount(id)}
                admin={admin}
						  />
                      
                    
                      
		</div>
                    
	}

}