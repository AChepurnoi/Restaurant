import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'

export default class ProfileModal extends React.Component{

    constructor(props) {
        super(props);
    }
    

	render(){

		let {user} = this.props;

		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Profile</h4>
				      </div>
				      <div class="modal-body">
				        <div>{user.login}</div>
				        <div>{user.email}</div>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


