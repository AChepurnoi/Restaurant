import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class CategoryList extends React.Component{

  constructor(props) {
      super(props);
      
  }
	render(){
		return <ul class="list-group">
                  <li class="list-group-item" onClick={this.props.onAddCategory}>Add new category</li> 
                  {this.props.items.map( item => 
                  	<li class="list-group-item" key={item.id}>{item.title} 
                  		<span class="glyphicon glyphicon-remove" onClick={this.props.onDeleteCategory.bind(this, item.id)}></span>
                  	</li>
                  )}
                  
                </ul>
                    
	}

}