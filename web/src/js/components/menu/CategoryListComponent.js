import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import CategoryList from './CategoryList'
import CreateCategoryModal from '../modals/CreateCategoryModal'
import {getCategories, createCategory, deleteCategory} from '../../actions/categoryActions'
import {openModal, closeModal} from '../../actions/modalActions'
import {getDishes} from '../../actions/dishActions'
import { bindActionCreators } from 'redux'
import {CATEGORY_MODAL_ID} from '../../const'

@connect( (store) =>{
	return {category: store.category, modal: store.modal, auth: store.auth};
}, dispatch => {
    return {
       loadCategories: bindActionCreators(getCategories, dispatch),
       createCategory: bindActionCreators(createCategory, dispatch),
       deleteCaregory: bindActionCreators(deleteCategory, dispatch),
       loadDishes: bindActionCreators(getDishes, dispatch),
       openCategoryModal: bindActionCreators(() => openModal(CATEGORY_MODAL_ID), dispatch),
    }
})
export default class CategoryListComponent extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.loadCategories();
    }

	render(){

        let modal;
        let {user} = this.props.auth;
        let admin = user? user.admin : false ;

        if(admin){
            modal = <CreateCategoryModal 
                                modalId={CATEGORY_MODAL_ID} 
                                onSavePressed={(data) => this.props.createCategory(data)}
                                 />
        }

		return <div>
            {modal}		
			<CategoryList 
                    onAddCategory={() => this.props.openCategoryModal()}
                    selected={this.props.category.selected}
                    items={this.props.category.categories}
			        onDeleteCategory={(id) => this.props.deleteCaregory(id)}
                    onSelect={(id) => this.props.loadDishes(id)}
                    showSales={true}
                    admin={admin}
						  />
		</div>
                    
	}

}