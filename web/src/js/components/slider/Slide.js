import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class Slide extends React.Component{

    constructor(props) {
        super(props);
        
    }
	render(){
		return <div class="slide">
                    <div class="slide-image">
                        <img src={this.props.url}/>
                    </div>
                    <div class="slide-content">{this.props.content}</div>
                </div>
                    
	}

}