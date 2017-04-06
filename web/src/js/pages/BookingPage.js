import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Slider from '../components/Slider/Slider'
import BookingComponent from "../components/booking/BookingComponent"

export default class BookingPage extends React.Component{

    componentDidMount(){

    }

	render(){


		return <div class="content">
            <div class="content-inside">
                <div class="container-fluid">
                    <BookingComponent/>
                </div>
            </div>
        </div>
	}

}