import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import DishList from './DishList'
import CreateDishModal from '../modals/CreateDishModal'
import {openModal, closeModal} from '../../actions/modalActions'
import {getCategories} from '../../actions/categoryActions'
import {DISH_MODAL_ID} from '../../const'
import {createDish, deleteDish} from '../../actions/dishActions'
import {addToCart} from '../../actions/cartActions'

import ModalController from '../../controllers/ModalController'

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

    addClick(){
    	this.modalController.openModal(DISH_MODAL_ID);
    }

    deleteClick(id){
    	this.props.dispatch(deleteDish(id));
    }


    addToCart(id){
        this.props.dispatch(addToCart(id));
    }


	createDish(title, description, categoryId, image){
		this.props.dispatch(createDish(title, description, categoryId, image))
	}

	render(){

        let {user} = this.props.auth;

        let admin = user? user.admin : false
        let modal

        if(admin){
            modal =  <CreateDishModal modalId={DISH_MODAL_ID} 
                             categories={this.props.category.categories}
                             onSavePressed={this.createDish.bind(this)}
                                 />
        }
		return <div class="row">
           
            {modal}		 
			<DishList onAddDish={this.addClick.bind(this)}
					  items={this.props.dish.dishes}
                      onAddToCart={this.addToCart.bind(this)}
                      onDelete={this.deleteClick.bind(this)}
                      admin={admin}
						  />
                      
                    
                      
		</div>
                    
	}

}