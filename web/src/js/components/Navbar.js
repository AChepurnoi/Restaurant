
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class Navbar extends React.Component{


	render(){
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
                        <li class="navbar-text cart"><span class="glyphicon glyphicon-shopping-cart cart-icon" aria-hidden="true"></span> Cart</li>
                    </ul>
                </div>
            </div>
        </nav>
	}

}