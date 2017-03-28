import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Slider from '../components/Slider/Slider'
import CreateCategoryModal from '../components/modals/CreateCategoryModal'

export default class MainPage extends React.Component{

    showModal(){
        $("#mymodal").modal('toggle');
    }


	render(){
		return <div class="content">
            <CreateCategoryModal modalId="mymodal" onSavePressed={this.showModal.bind(this)}/>
            <div class="content-inside">
                <div class="container-fluid">
                    <div class="row menu">
                        <div class="col-sm-3"><Link to="/menu">Menu</Link></div>
                        <div class="col-sm-3" onClick={this.showModal.bind(this)}>Delivery</div>
                        <div class="col-sm-3">Book</div>
                        <div class="col-sm-3">Sales</div>
                    </div>
                    <div class="row">
                        <div class="main-image"></div>
                    </div>
                    <div class="row categories">
                        <Slider images={[
                                        {url:"http://placehold.it/320x240", content:"This is simple slide1"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide2"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide3"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide4"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide5"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide6"}]}
                        />
                    </div>
                    <div class="row sales">
                          <Slider images={[
                                        {url:"http://placehold.it/320x240", content:"This is simple slide1"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide2"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide3"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide4"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide5"},
                                        {url:"http://placehold.it/320x240", content:"This is simple slide6"}]}
                        />
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