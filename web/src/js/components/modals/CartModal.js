import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Cropper from '../../../assets/javascripts/Cropper'
import axios from 'axios'

export default class CartModal extends React.Component{

    constructor(props) {
        super(props);
    }
    
    onDelete(id){
    	this.props.onDelete(id);
    }

    onAdd(id){
    	this.props.onAdd(id);
    }

	render(){

		let totalSum = this.props.items.reduce( (acc, item) => acc + (item.sale? (item.price - item.price * (item.discount / 100)) : item.price) * item.count, 0)
		
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Cart</h4>
				      </div>
				      <div class="modal-body">
					      <div class="row">
					       {this.props.items.map((item, i) => (
							<div class="media col-xs-12" key={i} >
							  <div class="media-left">
						      	<img class="media-object cart-image" src={item.image}/>
							  </div>
							  <div class="media-body">
							    <h5 class="media-heading">
							    	{item.title}
							    	{!item.sale && <span class="label label-primary cart-item-price">{item.price}$</span>}
							    	{item.sale && <span class="label label-warning cart-item-price">{item.price - item.price * (item.discount / 100)}$</span>}
							    </h5>

							    <div>
							    	{item.description}
							    </div>
							
								<div>
							    	<span class="glyphicon glyphicon-minus cart-remove" onClick={() => this.onDelete(item.id)}></span> 
							    	<span class="cart-counter">{item.count}</span> 
							    	<span class="glyphicon glyphicon-plus cart-add" onClick={() => this.onAdd(item.id)}></span>
							    </div>

							  </div>
							</div>

					       	))}
					      </div>
					      <div class="horizontal-divider"></div>

				      	  <div class="row pull-right">
				      	  	<span class="total-sum">Total: {totalSum}$</span> 
				      	  </div>
				      </div>

				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary">Create Order</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


