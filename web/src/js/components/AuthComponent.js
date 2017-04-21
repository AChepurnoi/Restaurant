
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
import { bindActionCreators } from 'redux'

@connect( store =>{
	return {modal: store.modal, auth: store.auth, cart: store.cart};
}, dispatch => {
    return {
      login: bindActionCreators(login, dispatch),
      register: bindActionCreators(register, dispatch),
      checkToken: bindActionCreators(checkLoginValidity, dispatch),
      addToCart: bindActionCreators(addToCart, dispatch),
      deleteFromCart: bindActionCreators(deleteFromCart, dispatch),
      createOrder: bindActionCreators(createOrder, dispatch)
    }
})
export default class AuthComponent extends React.Component{

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.checkToken();
        console.log(this);
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
                      onAdd={(id) => this.props.addToCart(id)}
                      onDelete={(id) => this.props.deleteFromCart(id)}
                      onOrderCreate={() => this.props.createOrder()}/>
        }
  		return <div>
                     <LoginModal modalId={LOGIN_MODAL_ID} onLogin={this.props.login}/>
                     <RegisterModal modalId={REGISTER_MODAL_ID} onRegister={this.props.register}/>
                     {cart}
                     {profile}
                  </div>
  	}



}


