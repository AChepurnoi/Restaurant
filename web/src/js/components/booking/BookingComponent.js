import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import {openModal, closeModal} from '../../actions/modalActions'
import BookTableModal from '../modals/BookTableModal'
import SVG from 'svg.js'
import {deleteTable, createTable, loadTables, loadBooking, selectTable, deselectTable, bookTable} from '../../actions/bookingActions'

@connect( (store) =>{
	return {modal: store.modal, auth: store.auth, booking: store.booking};
})
export default class BookingComponent extends React.Component{

    constructor(props) {
        super(props);
        this.plan = "https://s-media-cache-ak0.pinimg.com/originals/b5/00/03/b50003669af8e021d25c98d7cfd69689.jpg";
        this.marker = "http://www.clker.com/cliparts/B/B/1/E/y/r/marker-pin-google.svg";
        this.markerWidth = 55;
        this.markerHeight = 30;
        this.state = {placing: false, deleting: false}
        this.modalId = 'bookModal';
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
        this.props.dispatch(openModal('bookModal'));
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
        if(this.props.modal.id == this.modalId){
            if(this.props.modal.open) this.openModal();
            else this.closeModal();
        }

        this.disablePlacing();
        if(this.state.placing) this.enablePlacing();
        
        this.drawTables();
    }

	render(){
		return <div class="row">
            <BookTableModal modalId={this.modalId} booking={this.props.booking} onBook={this.onBook.bind(this)} />
           <div class={"btn " + (this.state.placing ? 'btn-success' : '')} onClick={this.togglePlacing.bind(this)}>Place table</div>
           <div class={"btn " + (this.state.deleting ? 'btn-success' : '')} onClick={this.toggleDeletion.bind(this)}>Delete table</div>
           <div id="svg-container">

           </div>          
		</div>
                    
	}

    openModal(){
        let id = this.modalId;
        $("#" + id).modal('show');
        let self = this;
        $('#' + id).one('hidden.bs.modal', function(e) {
            self.props.dispatch(closeModal(id));
        });
    }

    closeModal(){
        let id = this.modalId;
        $("#" + id).off('hidden.bs.modal');
        $("#" + id).modal('hide');
    }

}