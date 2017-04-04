import React from 'react'
import { connect } from "react-redux"
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {login} from './actions/authActions'

@connect( (store) =>{
	return {category: store.category, modal: store.modal};
})
export default class SecuredApp extends React.Component{


	constructor(props) {
		super(props);
		this.props.dispatch(login('ivan', 'password'));
		
	}
	render(){
		return <div>
			<Navbar/>
			{this.props.children}
			<Footer/>
		</div>
	}

}