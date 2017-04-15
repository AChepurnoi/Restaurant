import api from '../utility/api'
import {handleError} from './errorActions'


export function loadCart(){

	return (dispatch, getState) => {
		dispatch({type: "LOAD_CART_PENDING"});
		api.loadCart()
			.then(res => dispatch({type: "LOAD_CART_FULFILLED", payload: res.data}))
			.catch(err => {
				dispatch(handleError(err));
		   		dispatch({type: "LOAD_CART_REJECTED", payload: err});
			})


	}
}

export function addToCart(id){

	return (dispatch, getState) => {
		dispatch({type: "ADD_TO_CART_PEDNING", payload: id});
		api.addToCart(id)
			.then(res => dispatch({type: "ADD_TO_CART_FULFILLED", payload: res.data}))
			.catch( err => {
				dispatch(handleError(err));
		   		dispatch({type: "ADD_TO_CART_REJECTED", payload: err});
			});
	}

}

export function deleteFromCart(id){

	return (dispatch, getState) => {
		dispatch({type: "REMOVE_CART_ITEM", payload:id})
		api.removeFromCart(id)
			.then(res => dispatch({type: "REMOVE_CART_ITEM_FULFILLED", payload: res.data}))
			.catch(err => {
				dispatch(handleError(err));
				dispatch({type:"REMOVE_CART_ITEM_REJECTED", payload: err});
			});

	}
}
