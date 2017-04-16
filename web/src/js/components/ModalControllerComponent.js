
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import ModalController from '../controllers/ModalController'


@connect( store =>{
	return {modal: store.modal};
})
export default class ModalControllerComponent extends React.Component{

    constructor(props) {
        super(props);
        this.modalController = new ModalController(this.props.dispatch);

    }

  	componentDidUpdate(){
        let {id, open} = this.props.modal;
        if(open) this.modalController.showModal(id);
        else this.modalController.hideModal(id);

    }

	render(){
        return false; 
	}



}


