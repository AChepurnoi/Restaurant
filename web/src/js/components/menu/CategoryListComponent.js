import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import CategoryList from './CategoryList'
import CreateCategoryModal from '../modals/CreateCategoryModal'
import {getCategories, createCategory, deleteCategory} from '../../actions/categoryActions'
import {openModal, closeModal} from '../../actions/modalActions'
import {getDishes} from '../../actions/dishActions'
import {CATEGORY_MODAL_ID} from '../../const'
import ModalController from '../../controllers/ModalController'


@connect( (store) =>{
	return {category: store.category, modal: store.modal, auth: store.auth};
})
export default class CategoryListComponent extends React.Component{

    constructor(props) {
        super(props);
        this.modalController = new ModalController(this.props.dispatch);
        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.dispatch(getCategories());

    }

	render(){


        let modal;

        let {user} = this.props.auth;
        let admin = user? user.admin : false ;

        if(admin){
            modal = <CreateCategoryModal modalId={CATEGORY_MODAL_ID} 
                                 onSavePressed={(data) => this.props.dispatch(createCategory(data))}
                                 />
        }

		return <div>
            {modal}		
			<CategoryList onAddCategory={() => this.modalController.openModal(CATEGORY_MODAL_ID)}
						  items={this.props.category.categories}
						  onDeleteCategory={(id) => this.props.dispatch(deleteCategory(id))}
                          onSelect={(id) => this.props.dispatch(getDishes(id))}
                          admin={admin}
						  />
		</div>
                    
	}

}