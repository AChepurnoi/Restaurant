import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Cropper from '../../../assets/javascripts/Cropper'
import axios from 'axios'

export default class LoginModal extends React.Component{

    constructor(props) {
        super(props);
    }
    

    onSave(){
    	let login = $('#login-input').val();
    	let password = $('#password-input').val();
    	console.log('test');
    	this.props.onLogin(login,password);
    }


	render(){
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Login</h4>
				      </div>
				      <div class="modal-body">
				        <form id="category-modal-form">
							<div class="input-group">
							  <input id="login-input" type="text" class="form-control" placeholder="Category name" aria-describedby="basic-addon1"/>
							</div>
							<div class="input-group">
							  <input id="password-input" type="text" class="form-control" placeholder="Category name" aria-describedby="basic-addon1"/>
							</div>
				        </form>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary" onClick={this.onSave.bind(this)}>Login</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


