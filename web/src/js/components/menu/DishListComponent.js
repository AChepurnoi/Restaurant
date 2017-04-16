import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import DishList from './DishList'
import CreateDishModal from '../modals/CreateDishModal'
import {getCategories} from '../../actions/categoryActions'
import {DISH_MODAL_ID} from '../../const'
import ModalController from '../../controllers/ModalController'

import {createDish, deleteDish} from '../../actions/dishActions'
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

	render(){

        let {user} = this.props.auth;

        let admin = user? user.admin : false
        let modal

        if(admin){
            modal =  <CreateDishModal modalId={DISH_MODAL_ID} 
                             categories={this.props.category.categories}
                             onSavePressed={ (data) => this.props.dispatch(createDish(data))}
                                 />
        }
		return <div class="row">
           
            {modal}		 
			<DishList onAddDish={() => this.modalController.openModal(DISH_MODAL_ID)}
					      items={this.props.dish.dishes}
                onAddToCart={(id) => this.props.dispatch(addToCart(id))}
                onDelete={(id) => this.props.dispatch(deleteDish(id))}
                admin={admin}
						  />
                      
                    
                      
		</div>
                    
	}

}