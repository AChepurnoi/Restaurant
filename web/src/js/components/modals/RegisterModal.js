import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Cropper from '../../../assets/javascripts/Cropper'
import axios from 'axios'

export default class RegisterModal extends React.Component{

    constructor(props) {
        super(props);
    }
    

    onSave(){
    	let login = $('#login-register-input').val();
    	let password = $('#password-register-input').val();
    	let email = $('#email-register-input').val();
    	this.props.onRegister(login,password, email);
    }


	render(){
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Register</h4>
				      </div>
				      <div class="modal-body">
				        <form id="category-modal-form">
							<div class="form-group">
								<label for="login-register-input">Login</label>
							  <input id="login-register-input" type="text" class="form-control" placeholder="Login" aria-describedby="basic-addon1"/>
							</div>
							<div class="form-group">
								<label for="password-register-input">Password</label>
							  <input id="password-register-input" type="password" class="form-control" placeholder="Password" aria-describedby="basic-addon1"/>
							</div>

							<div class="form-group">
								<label for="email-register-input">Email</label>
							  <input id="email-register-input" type="text" class="form-control" placeholder="Email" aria-describedby="basic-addon1"/>
							</div>

				        </form>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary" onClick={this.onSave.bind(this)}>Register</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


