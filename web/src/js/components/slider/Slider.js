import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Slide from './Slide'


export default class Slider extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }      
    }


    nextSlide(){
        if(this.state.current + 1 == this.props.images.length) return;
        this.setState((prev, props) => {
            return {current: prev.current + 1}
        })
    }

    prevSlide(){
        if(this.state.current == 0) return;
        this.setState((prev, props) => {
            return {current: prev.current - 1}
        })
    }


	render(){
        let offset = this.state.current * 370 * -1;
        let style = {
            transform:"translate(" + offset +"px)"
        };

		return <div class="slider4">
            <div class="slider-padded" >
                <div class="slider-wrapper" style={style}>
                   {this.props.images.map((slide,i) => <Slide key={i} url={slide.url} content={slide.content}/>)}
                </div>
                <div class="prev-btn" onClick={this.prevSlide.bind(this)}>Prev</div>
                <div class="next-btn" onClick={this.nextSlide.bind(this)}>Next</div>
            </div>  

        </div>
	}

}