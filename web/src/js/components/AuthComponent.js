
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import axios from 'axios'
import LoginModal from './modals/LoginModal'
import RegisterModal from './modals/RegisterModal'
import {closeModal} from '../actions/modalActions'
import {login, register, checkLoginValidity} from '../actions/authActions'

@connect( store =>{
	return {modal: store.modal, auth: store.auth};
})
export default class AuthComponent extends React.Component{

    constructor(props) {
        super(props);
        this.props.dispatch(checkLoginValidity());
        this.loginModalId = "loginModal";
        this.registerModalId = "registerModal"
    }
    

    openModal(id){
    	$("#" + id).modal('show');
    	let self = this;
        $('#' + id).one('hidden.bs.modal', function(e) {
        	self.props.dispatch(closeModal(id));
        });
    }

    closeModal(id){
    	$("#" + id).off('hidden.bs.modal');
    	$("#" + id).modal('hide');
    }

  	componentDidUpdate(){
    	if(this.props.modal.id == this.loginModalId){
            let id = this.loginModalId;
        	if(this.props.modal.open) this.openModal(id);
        	else this.closeModal(id);
        }

        if(this.props.modal.id == this.registerModalId){
            let id = this.registerModalId;
            if(this.props.modal.open) this.openModal(id);
            else this.closeModal(id);
        }

    }
   
   	login(log, pass){
   		this.props.dispatch(login(log, pass));
   	}

    register(log, pass, email){
        this.props.dispatch(register(log,pass,email))
    }

	render(){
		return <div>
                   <LoginModal modalId={this.loginModalId} onLogin={this.login.bind(this)}/>
                   <RegisterModal modalId={this.registerModalId} onRegister={this.register.bind(this)}/>
                </div>
	}



}


