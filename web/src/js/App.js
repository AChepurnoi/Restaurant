import React from 'react'
import { connect } from "react-redux"
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {login} from './actions/authActions'
import AuthComponent from './components/AuthComponent'
import NotificationComponent from './components/NotificationComponent'
@connect( (store) =>{
	return {category: store.category, modal: store.modal};
})
export default class SecuredApp extends React.Component{


	constructor(props) {
		super(props);
	}


	render(){
		return <div>
			<Navbar/>
			<AuthComponent/>
			<NotificationComponent/>
			{this.props.children}
			<Footer/>
		</div>
	}

}