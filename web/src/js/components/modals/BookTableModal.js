import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'

export default class BookTableModal extends React.Component{

    constructor(props) {
        super(props);
    }


    onSubmit(){
    	let booker = $('#booker-name').val();
    	let phone = $('#booker-phone').val();
    	let date = new Date($('#start').val());
		date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
						date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
    	let start = date.toISOString();

    	let duration = $('#duration').val();
    	let data = {booker, phone, start, duration};
    	this.props.onBook(data);
    }
    
	render(){
		let dateOptions = {  
		    weekday: "long", month: "short",  
		    day: "numeric", hour: "2-digit", minute: "2-digit"  
		};  
		
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title booked">Booked</h4>
				      </div>
				      <div class="modal-body">
				      	<div>

				      		{this.props.booking.bookings.map((book, i) => <div key={i}>
				      		 <span class="book-from">From {(new Date(book.start)).toLocaleTimeString('en-us',dateOptions)} </span>
				      		 <span class="book-to">to {(new Date(book.end)).toLocaleTimeString('en-us',dateOptions)} </span>
				      		 </div>)}

				      	</div>

				      	<h3 class="book-title"> Book a table </h3>

				        <form id="category-modal-form">
							<div class="form-group">
							  <input id="booker-name" type="text" class="form-control" placeholder="Booker name" aria-describedby="basic-addon1"/>
							</div>

							<div class="form-group">
							  <input id="booker-phone" type="text" class="form-control" placeholder="Booker phone" aria-describedby="basic-addon1"/>
							</div>
							
							<div class="form-group">
								<input id="start" type="datetime-local" class="form-control"/>
							</div>
							<div class="form-group">
								<select id="duration" class="form-control">
									<option value='1'> 1 hour </option>
									<option value='2'> 2 hours </option>
									<option value='3'> 3 hours </option>
								</select>
							</div>
				        </form>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary" onClick={this.onSubmit.bind(this)}>Book</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


