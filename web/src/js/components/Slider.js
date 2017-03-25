import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class Slider extends React.Component{

	render(){
		return <div class="slider4">
            <div class="slider-padded">
                <div class="slider-wrapper">
                    <div class="slide">Item 2</div>
                    <div class="slide">Item 3</div>
                    <div class="slide">Item 4</div>
                    <div class="slide">Item 5</div>
                    <div class="slide">Item 6</div>
                    <div class="slide">Item 7</div>
                    <div class="slide">Item 8</div>
                    <div class="slide">Item 9</div>
                    <div class="slide">Item 10</div>
                </div>
                <div class="prev-btn">Prev</div>
                <div class="next-btn">Next</div>
            </div>  

        </div>
	}

}