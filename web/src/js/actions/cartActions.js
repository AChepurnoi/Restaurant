import api from '../utility/api'
import {handleError} from './errorActions'
import {notify} from './notificationActions'
import {closeModal} from './modalActions'
import {CART_MODAL_ID} from '../const'
export function loadCart(){

	return (dispatch, getState) => {
		api.loadCart()
			.then(res => dispatch({type: "LOAD_CART_FULFILLED", payload: res.data}))
			.catch(err => dispatch(handleError(err)))


	}
}


export function createOrder(){
	return (dispatch, getState) => {
		api.createOrder()
			.then(res => {
				dispatch({type: "CLEAR_CART"});
				dispatch({type: "ADD_ORDER", payload: res.data});
				dispatch(closeModal(CART_MODAL_ID));
				dispatch(notify('Order created', 'Order created', 'success'));

			})
			.catch(err => handleError(err));
	}
}

export function addToCart(id){

	return (dispatch, getState) => {
		dispatch({type: "ADD_TO_CART_PEDNING", payload: id});
		api.addToCart(id)
			.then(res => dispatch({type: "ADD_TO_CART_FULFILLED", payload: res.data}))
			.catch( err => dispatch(handleError(err)));
	}

}

export function deleteFromCart(id){

	return (dispatch, getState) => {
		dispatch({type: "REMOVE_CART_ITEM", payload:id})
		api.removeFromCart(id)
			.then(res => dispatch({type: "REMOVE_CART_ITEM_FULFILLED", payload: res.data}))
			.catch(err => dispatch(handleError(err)));

	}
}
