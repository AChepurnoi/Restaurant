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
    let selected = "category-selected ";
    
    if(this.props.admin){
      addBtn = <div class="btn btn-default category-add-btn" onClick={this.props.onAddCategory}>Add new category</div> 
      delBtn = (id) => <span class="glyphicon glyphicon-remove category-delete-btn" onClick={this.props.onDeleteCategory.bind(this, id)}></span>
    }

		return <div>
                {addBtn}
                <ul class="list-group">
                {this.props.showSales && 
                  <li class={this.props.selected == "sales"? selected + "list-group-item" : "list-group-item" } 
                      onClick={this.props.onSelect.bind(this, "sales")}
                      key="sales">
                        <span > Sales</span> 
                  </li>}


                    {this.props.items.map( item => 
                    	<li class={this.props.selected == item.id? selected + "list-group-item" : "list-group-item" } 
                          onClick={this.props.onSelect.bind(this, item.id)}
                          key={item.id}>
                        <span > {item.title} </span> 
                    		{delBtn(item.id)}
                    	</li>
                    )}

                </ul>
          </div>
                    
	}

}