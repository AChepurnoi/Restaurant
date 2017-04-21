
import React from 'react'
import { connect } from "react-redux"

@connect(store => {
	return {
		loader: store.loader
	}
})
export default class Loader extends React.Component{

	constructor(props) {
		super(props);
		
	}

	componentDidUpdate() {
		let show = this.props.loader.show;
		if(show) this.showLoader();
		else this.hideLoader();
	}

	showLoader(){
		$('#loader-item').removeClass("hidden").addClass("show");
	}

	hideLoader(){
		$('#loader-item').removeClass("show").addClass("hidden");
	}

	render(){
		return (
		<div id="loader-item" class='loader hidden'>
			<div class="loader--dot"></div>
			<div class="loader--dot"></div>
			<div class="loader--dot"></div>
			<div class="loader--dot"></div>
			<div class="loader--dot"></div>
			<div class="loader--dot"></div>
			<div class="loader--text"></div>
		</div>
  )
	}
}