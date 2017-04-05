import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class CategoryList extends React.Component{

  constructor(props) {
      super(props);
      
  }
	render(){

    let addBtn;
    let delBtn = (id) =>{}

    if(this.props.authorized){
      addBtn = <li class="list-group-item" onClick={this.props.onAddCategory}>Add new category</li> 
      delBtn = (id) => <span class="glyphicon glyphicon-remove" onClick={this.props.onDeleteCategory.bind(this, id)}></span>
    }

		return <ul class="list-group">
                  {addBtn}
                  {this.props.items.map( item => 
                  	<li class="list-group-item" key={item.id}>
                      <span onClick={this.props.onSelect.bind(this, item.id)}> {item.title} </span> 
                  		{delBtn(item.id)}
                  	</li>
                  )}
                </ul>
                    
	}

}