
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import {openModal} from '../actions/modalActions'

@connect( store => {
    return {modal: store.modal, auth: store.auth}
})
export default class Navbar extends React.Component{


    openLoginModal(){
        this.props.dispatch(openModal('loginModal'));
    }

	render(){

        let loginButton;
        let administationButton;

        if(!this.props.auth.authorized){
            loginButton = <li class="navbar-text" onClick={this.openLoginModal.bind(this)}>Login</li>
        }else {
            administationButton = <Link to="/admin"> <li class="navbar-text">Admin</li></Link>
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
                    <Link class="navbar-brand" to="/">Brand</Link>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        {loginButton}
                        {administationButton}
                        <li class="navbar-text cart"><span class="glyphicon glyphicon-shopping-cart cart-icon" aria-hidden="true"></span> Cart</li>
                        
                    </ul>
                </div>
            </div>
        </nav>
	}

}