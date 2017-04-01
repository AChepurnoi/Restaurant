import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import DishList from './DishList'
import CreateDishModal from '../modals/CreateDishModal'
import {openModal, closeModal} from '../../actions/modalActions'
import {getCategories} from '../../actions/categoryActions'

import {createDish, deleteDish} from '../../actions/dishActions'

@connect( (store) =>{
	return {category: store.category, dish: store.dish, modal: store.modal};
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


    componentDidUpdate(){
    	if(this.props.modal.id != this.modalId) return;

    	if(this.props.modal.open) this.openModal();
    	else this.closeModal();
    }

	createDish(title, description, categoryId, image){
		this.props.dispatch(createDish(title, description, categoryId, image))
	}
	render(){
		return <div class="row">
            <CreateDishModal modalId={this.modalId} 
                             categories={this.props.category.categories}
        					 onSavePressed={this.createDish.bind(this)}
            					 />
            					 
			<DishList onAddDish={this.addClick.bind(this)}
					  items={this.props.dish.dishes}
                      onDelete={this.deleteClick.bind(this)}
						  />
                    
                      
		</div>
                    
	}

}