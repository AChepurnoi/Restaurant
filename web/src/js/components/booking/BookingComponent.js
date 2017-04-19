import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import BookTableModal from '../modals/BookTableModal'
import SVG from 'svg.js'
import {deleteTable, createTable, loadTables, loadBooking, selectTable, deselectTable, bookTable} from '../../actions/bookingActions'
import ModalController from '../../controllers/ModalController'
import {BOOK_MODAL_ID} from '../../const'

@connect( (store) =>{
	return {modal: store.modal, auth: store.auth, booking: store.booking};
})
export default class BookingComponent extends React.Component{

    constructor(props) {
        super(props);
        this.modalController = new ModalController(this.props.dispatch);

        this.plan = "/images/plan.jpg";
        this.marker = "http://www.clker.com/cliparts/B/B/1/E/y/r/marker-pin-google.svg";
        this.markerWidth = 55;
        this.markerHeight = 30;
        this.state = {placing: false, deleting: false}
    }


    drawTables(){
        let self = this;
        this.itemsContainer.clear();   
        this.props.booking.tables.forEach(item =>{
            const {markerWidth, markerHeight} = self;
            let marker = self.itemsContainer.image(self.marker, markerWidth, markerHeight);
            marker.attr({ x: item.posx, y: item.posy});
            marker.on('click', event => self.itemClicked(item.id));
        })

    }

    itemClicked(id){
        if(this.state.deleting) {
            this.props.dispatch(deleteTable(id));
            return;
        }
        this.modalController.openModal(BOOK_MODAL_ID);
        this.props.dispatch(selectTable(id));
        this.props.dispatch(loadBooking(id));
        
    
    }

    enablePlacing(){
        const {back} = this;
        const self = this;
        let pos = $('#svg-container').offset(); 

        back.on('click', event => {
            let xpos = event.x - (self.markerWidth / 2) - pos.left;
            let ypos = event.y - pos.top - (self.markerHeight / 2);
            self.props.dispatch(createTable(xpos, ypos));
        })
    }

    disablePlacing(){
        this.back.off('click');
    }


    toggleDeletion(){
        this.setState((prevState, props) => {
            return {deleting: !prevState.deleting}
        })
    }

    togglePlacing(){
        this.setState((prevState, props) => {
            return {placing: !prevState.placing}
        })
    }


    componentDidMount(prevProps, prevState) {
        const {markerWidth, markerHeight} = {markerWidth: 55, markerHeight: 30};
        this.draw = new SVG('svg-container');
        this.back = this.draw.image(this.plan, 600, 420);
        this.itemsContainer = this.draw.group();
        this.props.dispatch(loadTables());

    }


    componentDidUpdate(prevProps, prevState) {

        this.disablePlacing();
        if(this.state.placing) this.enablePlacing();
        this.drawTables();
    }

	render(){

        let admin = this.props.auth.authorized? (this.props.auth.user ? this.props.auth.user.admin : false) : false;

        let placingButton =  admin ? <div class={"btn booking-button " + (this.state.placing ? 'btn-success' : '')} onClick={this.togglePlacing.bind(this)}>Place table</div> : ""
        let deleteButton = admin ? <div class={"btn booking-button " + (this.state.deleting ? 'btn-success' : '')} onClick={this.toggleDeletion.bind(this)}>Delete table</div> : ""

		return <div class="row">
            <BookTableModal 
                modalId={BOOK_MODAL_ID} 
                booking={this.props.booking} 
                onBook={(data) => this.props.dispatch(bookTable(this.props.booking.selectedTable, data))} />

            <div class="booking-title text-center">
                <h2> Book your table </h2>
                <h3> This is restaurant plan where you can book table </h3>
            </div>
            <div class="text-center">
                <div class="col-xs-5 col-xs-offset-1 col-sm-3 col-sm-offset-3 col-md-2 col-md-offset-4 col-lg-2 col-lg-offset-4">
                    {placingButton}
                </div>
                <div class="col-xs-5 col-sm-offset-0 col-sm-3 col-lg-2">   
                    {deleteButton}
               </div>
           </div>
           <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
               <div id="svg-container">
               </div>          
           </div>
		</div>
                    
	}


}