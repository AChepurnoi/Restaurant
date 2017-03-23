import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class MainPage extends React.Component{

	render(){
		return <div class="content">
            <div class="content-inside">
                <div class="container-fluid">
                    <div class="row menu">
                        <div class="col-sm-3"><Link to="/menu">Menu</Link></div>
                        <div class="col-sm-3">Delivery</div>
                        <div class="col-sm-3">Book</div>
                        <div class="col-sm-3">Sales</div>
                    </div>
                    <div class="row">
                        <div class="main-image"></div>
                    </div>
                    <div class="row categories">
                        <div class="col-sm-3">Item 1</div>
                        <div class="col-sm-3">Item 2</div>
                        <div class="col-sm-3">Item 3</div>
                        <div class="col-sm-3">Item 4</div>
                    </div>
                    <div class="row sales">
                        <div class="col-sm-4">Item 1</div>
                        <div class="col-sm-4">Item 2</div>
                        <div class="col-sm-4">Item 3</div>
                    </div>
                    <div class="row actions">
                        <div class="col-sm-6">Order</div>
                        <div class="col-sm-6">Book</div>
                    </div>
                </div>
            </div>
        </div>
	}

}