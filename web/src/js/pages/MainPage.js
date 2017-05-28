import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Slider from '../components/Slider/Slider'
import {DELIVERY_MODAL_ID} from '../const'
import DeliveryModal from '../components/modals/DeliveryModal'
import {getCategories} from '../actions/categoryActions'
import {loadSales} from '../actions/dishActions'
import { bindActionCreators } from 'redux'
import {openModal} from '../actions/modalActions'

@connect(store => {
    return {category: store.category, dish: store.dish}
}, dispatch => {
    return {
        openDeliveryModal: bindActionCreators(() => openModal(DELIVERY_MODAL_ID),dispatch),
        loadCategories: bindActionCreators(getCategories, dispatch),
        loadSales: bindActionCreators(loadSales, dispatch)
    }
})
export default class MainPage extends React.Component{


    constructor(props) {
        super(props);
    }


    componentDidMount(){
        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.loadCategories();

        const {sales} = this.props.dish;
        if(!sales.length) this.props.loadSales();
    }


	render(){
        let categorySlides = this.props.category.categories.map(item => ({content: item.title, url: item.image}));
        let salesSlides = this.props.dish.sales.map(item => ({content: item.title, url: item.image}));

        let mapStyle = {
            margin: "auto",
            display: "block"
        };

		return <div class="content">
            <DeliveryModal modalId={DELIVERY_MODAL_ID}/>
            <div class="content-inside">
                <div class="container-fluid">
                    <div class="row menu">
                        <Link to="/menu"><div class="col-sm-3 col-xs-6 btn btn-link main-button">Menu</div></Link>
                        <div onClick={() => this.props.openDeliveryModal()} class="col-sm-3 col-xs-6 btn btn-link main-button">
                            <span >Delivery</span>
                        </div>
                        <Link to="/booking"><div class="col-sm-3 col-xs-6 btn btn-link main-button">Book</div></Link>
                        <Link to="/menu"><div class="col-sm-3 col-xs-6 btn btn-link main-button">Sales</div></Link>
                    </div>
                    <div class="row">
                        <div class="main-image-container">
                            <img src="/images/main-image.jpg" class="main-image"/>
                        </div>
                    </div>
                    <div class="row categories">
                        <h2 class="text-center">We offer</h2>
                        <Slider images={categorySlides}
                        />
                    </div>
                    <div class="row sales">

                        <h2 class="text-center">On sale</h2>

                        <Slider images={salesSlides}
                        />
                    </div>
                    <div class="row actions">
                        <Link to="/menu"><div class="col-sm-6"><div class="btn btn-primary order-btn">Order</div></div></Link>
                        <Link to="/booking"><div class="col-sm-6"><div class="btn btn-primary book-btn">Book</div></div></Link>
                    </div>

                    <div class="row">
                        <iframe width="600" height="450" frameborder="0" style={mapStyle}
                                src="https://www.google.com/maps/embed/v1/place?q=%D0%9F%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA%20%D0%9A%D0%BE%D0%B2%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%205&key=AIzaSyDZ5SUisxQiFa-b99R4BkiczAjvrdTa_fo"
                                allowfullscreen></iframe>

                    </div>
                </div>
            </div>
        </div>
	}

}