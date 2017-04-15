import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Cropper from '../../../assets/javascripts/Cropper'
import axios from 'axios'

export default class CartModal extends React.Component{

    constructor(props) {
        super(props);
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
				       {this.props.items.map((item, i) => <div key={i}>Dish: {item.dish.title}. Count: {item.count}</div>)}

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


