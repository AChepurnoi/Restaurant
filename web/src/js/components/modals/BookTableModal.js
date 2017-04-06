import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'

export default class BookTableModal extends React.Component{

    constructor(props) {
        super(props);
    }


    onSubmit(){

    }
    
	render(){
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Create category</h4>
				      </div>
				      <div class="modal-body">
				        <form id="category-modal-form">
							<div class="input-group">
							  <input id="booker-name" type="text" class="form-control" placeholder="Booker name" aria-describedby="basic-addon1"/>
							</div>
							
							<div class="time-selector">
								TBD
							</div>

				        </form>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary" onClick={this.onSubmit.bind(this)}>Book changes</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


