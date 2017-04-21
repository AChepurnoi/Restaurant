import React from 'react'
import { connect } from "react-redux"
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {login} from './actions/authActions'
import AuthComponent from './components/AuthComponent'
import NotificationComponent from './components/NotificationComponent'
import ModalControllerComponent from './components/ModalControllerComponent'
import Loader from './components/Loader'


export default class SecuredApp extends React.Component{

	constructor(props) {
		super(props);
	}


	render(){
		return <div class="max-height">
			<Navbar/>
			<AuthComponent/>
			<NotificationComponent/>
			<ModalControllerComponent/>
			<Loader/>
			{this.props.children}
			<Footer/>
		</div>
	}

}