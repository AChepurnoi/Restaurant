import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'

export default class ProfileModal extends React.Component{

    constructor(props) {
        super(props);
    }
    

	render(){

		let {user} = this.props;
		console.log("Render profile modal");
		let dateOptions = {  
		    weekday: "long", month: "short",  
		    day: "numeric", hour: "2-digit", minute: "2-digit"  
		};  

		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Profile</h4>
				      </div>
				      <div class="modal-body">
				        <div class="username-profile">Username: {user.login}</div>
				        <div class="email-profile">Email: {user.email}</div>
				        <div class="phone-profile">Mobile Phone: {user.phone}</div>

				        {user.orders.map(order => (

				        	<div class="order-item">
				        		<div class="horizontal-divider"></div>
				        		<div class="order-title"><span class="glyphicon glyphicon-list-alt"></span>Order {order.id}<div class="order-status label label-info">{order.status}</div></div>
								<div class="order-total">Total {order.total}$</div>
								<div class="order-created">Created: {(new Date(order.created)).toLocaleTimeString('en-us',dateOptions)}</div>

					        	{order.items.map((item, i) => (
					        	<div class="media" key={i} >
								  <div class="media-left">
							      	<img class="media-object cart-image" src={item.image}/>
								  </div>
								  <div class="media-body">
								    <h5 class="media-heading">
								    	{item.title}
								    	{!item.sale && <span class="label label-primary cart-item-price">{item.price}$</span>}
								    	{item.sale && <span class="label label-warning cart-item-price">{item.price - item.price * (item.discount / 100)}$</span>}
								    	<span class="label label-success order-counter">{item.count}</span> 
								    </h5>

								    <div>
								    	{item.description}
								    </div>
								
									<div>
								    	
								    </div>

								  </div>
								</div>))}

				        	</div>




				        	))}

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


