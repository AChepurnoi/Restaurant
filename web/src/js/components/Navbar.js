
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import {openModal} from '../actions/modalActions'
import ModalController from '../controllers/ModalController'

@connect( store => {
    return {modal: store.modal, auth: store.auth}
})
export default class Navbar extends React.Component{


    constructor(props) {
        super(props);
        this.modalController = new ModalController(this.props.dispatch)
    }

    openLoginModal(){
        this.props.dispatch(openModal('loginModalId'));
    }

    openRegisterModal(){
        this.props.dispatch(openModal('registerModalId'));
    }

    openCartModal(){
        this.props.dispatch(openModal('cartModalId'))
    }

    logout(){
        this.props.dispatch({type: "LOGOUT"});
    }

    openProfileModal(){
        this.props.dispatch(openModal('profileModalId'));
    }

	render(){

        let loginButton;
        let registerButton;
        let profileButton;
        let logoutButton;
        let cartButton;

        if(!this.props.auth.authorized){
            loginButton = <li class="navbar-text" onClick={this.openLoginModal.bind(this)}><div class="navbar-button"> Login </div> </li>
            registerButton = <li class="navbar-text" onClick={this.openRegisterModal.bind(this)}><div class="navbar-button"> Register</div></li>
        }else {
            cartButton =  <li class="navbar-text cart" onClick={this.openCartModal.bind(this)}>
                    <div class="navbar-button">
                        <span class="glyphicon glyphicon-shopping-cart cart-icon" aria-hidden="true"></span>
                    </div>
                </li>
            profileButton = <li class="navbar-text" onClick={this.openProfileModal.bind(this)}><div class="navbar-button"> Profile</div></li>
            logoutButton = <li class="navbar-text" onClick={this.logout.bind(this)}><div class="navbar-button"> Logout</div></li>
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