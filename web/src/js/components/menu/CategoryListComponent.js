import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import CategoryList from './CategoryList'
import CreateCategoryModal from '../modals/CreateCategoryModal'
import {getCategories} from '../../actions/categoryActions'

@connect( (store) =>{
	return store.category;
})
export default class CategoryListComponent extends React.Component{

    constructor(props) {
        super(props);
        const {items, dispatch} = this.props;
        if(!items.length) dispatch(getCategories());

    }

	showModal(){
    	$("#mymodal").modal('toggle');
	}

	render(){
		return <div>
            <CreateCategoryModal modalId="mymodal" 
            					 onSavePressed={this.showModal.bind(this)}/>
            					 
			<CategoryList onAddCategory={this.showModal.bind(this)}
						  items={this.props.items}/>
		</div>
                    
	}

}