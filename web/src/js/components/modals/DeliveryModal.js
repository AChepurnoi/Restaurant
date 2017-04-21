import React from 'react'

export default class DeliveryModal extends React.Component{

    constructor(props) {
        super(props);
    }
    

	render(){
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Profile</h4>
				      </div>
				      <div class="modal-body">
				       Delivery information<br/>
				       Fill your cart and create oreder, we will call you to confirm your delivery!

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


