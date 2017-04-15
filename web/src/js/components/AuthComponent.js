
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import axios from 'axios'
import LoginModal from './modals/LoginModal'
import RegisterModal from './modals/RegisterModal'
import CartModal from './modals/CartModal'
import {closeModal} from '../actions/modalActions'
import {login, register, checkLoginValidity} from '../actions/authActions'
import {deleteFromCart,addToCart } from '../actions/cartActions'
import ProfileModal from './modals/ProfileModal'

@connect( store =>{
	return {modal: store.modal, auth: store.auth, cart: store.cart};
})
export default class AuthComponent extends React.Component{

    constructor(props) {
        super(props);
        this.props.dispatch(checkLoginValidity());
        this.loginModalId = "loginModal";
        this.registerModalId = "registerModal"
        this.cartModalId = 'cartModal'
        this.profileModalId = 'profileModal'
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

        if(this.props.modal.id == this.cartModalId){
            let id = this.cartModalId;
            if(this.props.modal.open) this.openModal(id);
            else this.closeModal(id);
        }

        if(this.props.modal.id == this.profileModalId){
            let id = this.profileModalId;
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

    onCartItemDelete(id){
        this.props.dispatch(deleteFromCart(id));
    }

	render(){

        let profile;
        if(this.props.auth.user){
            profile = <ProfileModal modalId={this.profileModalId} user={this.props.auth.user} />
        }
		return <div>
                   <LoginModal modalId={this.loginModalId} onLogin={this.login.bind(this)}/>
                   <RegisterModal modalId={this.registerModalId} onRegister={this.register.bind(this)}/>
                   <CartModal modalId={this.cartModalId} items={this.props.cart.items} onDelete={this.onCartItemDelete.bind(this)}/>
                   {profile}
                </div>
	}



}


