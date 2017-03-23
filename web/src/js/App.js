import React from 'react'
import { connect } from "react-redux"
import Footer from './components/Footer'
import Navbar from './components/Navbar'


export default class MainPage extends React.Component{

	render(){
		return <div>
			<Navbar/>
			{this.props.children}
			<Footer/>
		</div>
	}

}