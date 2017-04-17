import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class DishList extends React.Component{

    constructor(props) {
        super(props);
      
    }
	render(){

        let addBtn;
        let delBtn = (id) => {};
        let editDiscount = (id) => {};
        let addCartBtn = (id) => {};
        
        if(this.props.admin){
            addBtn = <div class="col-md-12" onClick={this.props.onAddDish.bind(this)}> 
                         <span class="btn">Add dish</span>
                     </div>
            editDiscount = (id) => <span class="glyphicon glyphicon-pencil" onClick={this.props.onEditDiscount.bind(this, id)}></span>
            delBtn = (id) => <span class="glyphicon glyphicon-remove" onClick={this.props.onDelete.bind(this, id)}></span>
         
            addCartBtn = (id) => <div class="btn" onClick={this.props.onAddToCart.bind(this, id)}>Add to cart</div>     
        }

		return <div class="row"> 
                {addBtn}
                {this.props.items.map(
                  item => <div class="col-md-4" key={item.id}>
                            <div class="panel panel-default">
                              <div class="panel-heading">
                                <h3 class="panel-title">{item.title}</h3>
                                 {delBtn(item.id)} {editDiscount(item.id)}
                              </div>
                              <div class="panel-body">
                                <div>
                                  <img class="img-responsive" src={item.image}/>
                                </div>

                                <div>{item.description}</div>
                                {addCartBtn(item.id)}
                              </div>
                            </div>
                          </div>)}
                
              </div>
                    
	}

}