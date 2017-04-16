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

        this.plan = "http://slyfelinos.com/plans/440x330-nicole-neills-portfolio-turquiose-restaurant-2122910.png";
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
        let pos = $('#svg-container').position();    

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

    onBook(data){
        this.props.dispatch(bookTable(this.props.booking.selectedTable, data));
    }


    componentDidMount(prevProps, prevState) {
        const {markerWidth, markerHeight} = {markerWidth: 55, markerHeight: 30};
        this.draw = new SVG('svg-container');
        this.back = this.draw.image(this.plan, 600, 600);
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

        let placingButton =  admin ? <div class={"btn " + (this.state.placing ? 'btn-success' : '')} onClick={this.togglePlacing.bind(this)}>Place table</div> : ""
        let deleteButton = admin ? <div class={"btn " + (this.state.deleting ? 'btn-success' : '')} onClick={this.toggleDeletion.bind(this)}>Delete table</div> : ""

		return <div class="row">
            <BookTableModal modalId={BOOK_MODAL_ID} booking={this.props.booking} onBook={this.onBook.bind(this)} />
           {placingButton}
           {deleteButton}
           <div id="svg-container">

           </div>          
		</div>
                    
	}


}