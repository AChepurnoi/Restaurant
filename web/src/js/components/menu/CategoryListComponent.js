import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import CategoryList from './CategoryList'

export default class CategoryListComponent extends React.Component{

    constructor(props) {
        super(props);
        
    }
	render(){
		return <CategoryList/>
                    
	}

}