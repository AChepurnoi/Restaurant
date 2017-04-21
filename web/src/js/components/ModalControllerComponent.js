
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import {closeModal, openModal} from '../actions/modalActions'

@connect( store =>{
	return {modal: store.modal};
})
export default class ModalControllerComponent extends React.Component{

    constructor(props) {
        super(props);
    }

  	componentDidUpdate(){
        let {id, open} = this.props.modal;
        if(open) this.showModal(id);
        else this.hideModal(id);

    }

	render(){
        return false; 
	}


    showModal(id){
        $("#" + id).modal('show');
        let self = this;
        $('#' + id).one('hidden.bs.modal', e => self.props.dispatch(closeModal(id)));
    }

    hideModal(id){
        $("#" + id).off('hidden.bs.modal');
        $("#" + id).modal('hide');
    }




}


