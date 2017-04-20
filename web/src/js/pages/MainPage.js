import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Slider from '../components/Slider/Slider'
import ModalController from '../controllers/ModalController'
import {DELIVERY_MODAL_ID} from '../const'
import DeliveryModal from '../components/modals/DeliveryModal'
import {getCategories} from '../actions/categoryActions'
import {loadSales} from '../actions/dishActions'


@connect(store => {
    return {category: store.category, dish: store.dish}
})
export default class MainPage extends React.Component{


    constructor(props) {
        super(props);
        this.modalController = new ModalController(this.props.dispatch);
        const {categories, loading} = this.props.category;
        if(!categories.length && !loading) this.props.dispatch(getCategories());

        const {sales} = this.props.dish;
        if(!sales.length) this.props.dispatch(loadSales());
    }


    componentDidMount(){

    }


	render(){
        let categorySlides = this.props.category.categories.map(item => ({content: item.title, url: item.image}));
        let salesSlides = this.props.dish.sales.map(item => ({content: item.title, url: item.image}));

		return <div class="content">
            <DeliveryModal modalId={DELIVERY_MODAL_ID}/>
            <div class="content-inside">
                <div class="container-fluid">
                    <div class="row menu">
                        <div class="col-sm-3 col-xs-6 btn btn-link"><Link to="/menu">Menu</Link></div>
                        <div class="col-sm-3 col-xs-6 btn btn-link">
                            <span onClick={() => this.modalController.openModal(DELIVERY_MODAL_ID)}>Delivery</span>
                        </div>
                        <div class="col-sm-3 col-xs-6 btn btn-link"><Link to="/booking">Book</Link></div>
                        <div class="col-sm-3 col-xs-6 btn btn-link">Sales</div>
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
                        <div class="col-sm-6"><div class="btn btn-primary order-btn">Order</div></div>
                        <div class="col-sm-6"><div class="btn btn-primary book-btn">Book</div></div>
                    </div>
                </div>
            </div>
        </div>
	}

}