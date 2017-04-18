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
    
    if(this.props.admin){
      addBtn = <div class="btn btn-default category-add-btn" onClick={this.props.onAddCategory}>Add new category</div> 
      delBtn = (id) => <span class="glyphicon glyphicon-remove category-delete-btn" onClick={this.props.onDeleteCategory.bind(this, id)}></span>
    }

		return <div>
                {addBtn}
                <ul class="list-group">
                    {this.props.items.map( item => 
                    	<li class="list-group-item" key={item.id}>
                        <span onClick={this.props.onSelect.bind(this, item.id)}> {item.title} </span> 
                    		{delBtn(item.id)}
                    	</li>
                    )}
                  </ul>
          </div>
                    
	}

}