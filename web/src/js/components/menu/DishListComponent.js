import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import DishList from './DishList'
import CreateDishModal from '../modals/CreateDishModal'
import {openModal, closeModal} from '../../actions/modalActions'
import {getCategories} from '../../actions/categoryActions'

import {createDish, deleteDish} from '../../actions/dishActions'
import {addToCart} from '../../actions/cartActions'

@connect( (store) =>{
	return {category: store.category, dish: store.dish, modal: store.modal, auth: store.auth};
})
export default class DishListComponent extends React.Component{

    constructor(props) {
        super(props);
        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.dispatch(getCategories());
        this.modalId = "dishModal";
    }

    openModal(){
    	let id = this.modalId;
    	$("#" + id).modal('show');
    	let self = this;
        $('#' + id).one('hidden.bs.modal', function(e) {
        	self.props.dispatch(closeModal(id));
        });
    }

    closeModal(){
    	let id = this.modalId;
    	$("#" + id).off('hidden.bs.modal');
    	$("#" + id).modal('hide');
    }

    addClick(){
    	this.props.dispatch(openModal(this.modalId));
    }

    deleteClick(id){
    	this.props.dispatch(deleteDish(id));
    }


    addToCart(id){
        this.props.dispatch(addToCart(id));
    }


    componentDidUpdate(){
    	if(this.props.modal.id != this.modalId) return;

    	if(this.props.modal.open) this.openModal();
    	else this.closeModal();
    }

	createDish(title, description, categoryId, image){
		this.props.dispatch(createDish(title, description, categoryId, image))
	}
	render(){

        let {user} = this.props.auth;

        let admin = user? user.admin : false
        let modal

        if(admin){
            modal =  <CreateDishModal modalId={this.modalId} 
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