
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import axios from 'axios'
import LoginModal from './modals/LoginModal'
import {closeModal} from '../actions/modalActions'
import {login} from '../actions/authActions'

@connect( store =>{
	return {modal: store.modal};
})
export default class AuthComponent extends React.Component{

    constructor(props) {
        super(props);
        this.modalId = "loginModal";
    }
    

    openModal(){
    	let id = this.modalId;
    	$("#" + id).modal('show');
    	let self = this;
        $('#' + id).one('hidden.bs.modal', function(e) {
        	self.props.dispatch(closeModal(id));
        });
    }

    closeModal(){
    	let id = this.modalId;
    	$("#" + id).off('hidden.bs.modal');
    	$("#" + id).modal('hide');
    }

  	componentDidUpdate(){
    	if(this.props.modal.id != this.modalId) return;

    	if(this.props.modal.open) this.openModal();
    	else this.closeModal();
    }
   
   	login(log, pass){
   		this.props.dispatch(login(log, pass));
   	}

	render(){
		return <LoginModal modalId={this.modalId} onLogin={this.login.bind(this)}/>
	}



}


