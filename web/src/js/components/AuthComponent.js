
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import axios from 'axios'
import LoginModal from './modals/LoginModal'
import RegisterModal from './modals/RegisterModal'
import CartModal from './modals/CartModal'
import {closeModal} from '../actions/modalActions'
import {login, register, checkLoginValidity} from '../actions/authActions'
import {deleteFromCart,addToCart, createOrder} from '../actions/cartActions'
import ProfileModal from './modals/ProfileModal'
import {REGISTER_MODAL_ID, LOGIN_MODAL_ID, CART_MODAL_ID, PROFILE_MODAL_ID} from '../const'

@connect( store =>{
	return {modal: store.modal, auth: store.auth, cart: store.cart};
})
export default class AuthComponent extends React.Component{

    constructor(props) {
        super(props);
        this.props.dispatch(checkLoginValidity());
    }
    

   	login(log, pass){
   		this.props.dispatch(login(log, pass));
   	}

    register(data){
      this.props.dispatch(register(data))
    }


  	render(){

        let profile;
        let cart;
        if(this.props.auth.user){
          profile = <ProfileModal 
                      modalId={PROFILE_MODAL_ID} 
                      user={this.props.auth.user} />

          cart = <CartModal 
                      modalId={CART_MODAL_ID} 
                      items={this.props.cart.items} 
                      onAdd={(id) => this.props.dispatch(addToCart(id))}
                      onDelete={(id) => this.props.dispatch(deleteFromCart(id))}
                      onOrderCreate={() => this.props.dispatch(createOrder())}/>
        }
  		return <div>
                     <LoginModal modalId={LOGIN_MODAL_ID} onLogin={this.login.bind(this)}/>
                     <RegisterModal modalId={REGISTER_MODAL_ID} onRegister={this.register.bind(this)}/>
                     {cart}
                     {profile}
                  </div>
  	}



}


