import {REGISTER_MODAL_ID, LOGIN_MODAL_ID, CART_MODAL_ID, PROFILE_MODAL_ID} from '../const'
import {openModal, closeModal} from '../actions/modalActions'

export default class ModalController {

    constructor(dispatch) {
    	this.dispatch = dispatch;
		this.modals = [REGISTER_MODAL_ID, LOGIN_MODAL_ID, CART_MODAL_ID, PROFILE_MODAL_ID];

    }

    showModal(id){
        $("#" + id).modal('show');
        let self = this;
        $('#' + id).one('hidden.bs.modal', e => self.dispatch(closeModal(id)));
    }

    hideModal(id){
        $("#" + id).off('hidden.bs.modal');
        $("#" + id).modal('hide');
    }

    openModal(id){
        this.dispatch(openModal(id));	
    }

    closeModal(id){
    	this.dispatch(closeModal(id));
    }


}


