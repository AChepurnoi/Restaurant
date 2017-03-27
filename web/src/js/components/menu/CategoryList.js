import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class CategoryList extends React.Component{

    constructor(props) {
        super(props);
        
    }
	render(){
		return <ul class="list-group">
                  <li class="list-group-item">Add new category</li> 
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                  <li class="list-group-item">Item 6</li>
                  <li class="list-group-item">Item 7</li>
                  <li class="list-group-item">Item 8</li>
                  <li class="list-group-item">Item 9</li>
                </ul>
                    
	}

}