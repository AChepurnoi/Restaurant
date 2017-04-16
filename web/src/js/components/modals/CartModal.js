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
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Cart</h4>
				      </div>
				      <div class="modal-body">
				       {this.props.items.map((item, i) => <div key={i}> 
				       		<span>Dish: {item.title} </span> 
				       		<span class="glyphicon glyphicon-remove" onClick={this.onDelete.bind(this, item.id)}></span>
				       		<span>Count: {item.count} </span>
				       		<span class="glyphicon glyphicon-plus" onClick={this.onAdd.bind(this, item.id)}></span>

				       	</div>)}

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


