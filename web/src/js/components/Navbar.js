
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import {openModal} from '../actions/modalActions'
import {loadCart} from '../actions/cartActions'
import { bindActionCreators } from 'redux'
import {seqCall} from '../utility/utils'
import {reloadUser} from '../actions/authActions'

import {LOGIN_MODAL_ID, PROFILE_MODAL_ID, CART_MODAL_ID, REGISTER_MODAL_ID} from '../const'


@connect( store => {
    return {modal: store.modal, auth: store.auth}
}, dispatch => {
    return {
        openLoginModal: bindActionCreators(() => openModal(LOGIN_MODAL_ID), dispatch),
        openProfileModal: seqCall(bindActionCreators({
            a: () => openModal(PROFILE_MODAL_ID),
            b: () => reloadUser()
        }, dispatch)),
        openRegisterModal: bindActionCreators(() => openModal(REGISTER_MODAL_ID), dispatch),
        openCartModal: seqCall(bindActionCreators({
            a: () => openModal(CART_MODAL_ID),
            b: () => loadCart()
        },dispatch)),
        logout: bindActionCreators(() => ({type: "LOGOUT"}), dispatch)


    }
})
export default class Navbar extends React.Component{


    constructor(props) {
        super(props);
    }

	render(){
        let loginButton;
        let registerButton;
        let profileButton;
        let logoutButton;
        let cartButton;

        if(!this.props.auth.authorized){
            loginButton = <li class="navbar-text" onClick={this.props.openLoginModal}><div class="navbar-button"> Login </div> </li>
            registerButton = <li class="navbar-text" onClick={this.props.openRegisterModal}><div class="navbar-button"> Register</div></li>
        }else {
            cartButton =  <li class="navbar-text cart" onClick={this.props.openCartModal}>
                    <div class="navbar-button">
                        <span class="glyphicon glyphicon-shopping-cart cart-icon" aria-hidden="true"></span>
                    </div>
                </li>
            profileButton = <li class="navbar-text" onClick={this.props.openProfileModal}><div class="navbar-button"> Profile</div></li>
            logoutButton = <li class="navbar-text" onClick={this.props.logout}><div class="navbar-button"> Logout</div></li>
        }

		return <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <Link class="navbar-brand" to="/"><div class="navbar-logo">Simple Restaurant</div></Link>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        {loginButton}
                        {registerButton}
                        {profileButton}
                        {logoutButton}
                        {cartButton}
                       
                    </ul>
                </div>
            </div>
        </nav>
	}

}