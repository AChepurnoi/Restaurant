import api from '../utility/api'
import {handleError} from './errorActions'
import {closeModal} from './modalActions'
import {DISH_MODAL_ID, DISCOUNT_MODAL_ID} from '../const'


export function getDishes(category){
	return(dispatch, getState) => {
		dispatch({type: "DISH_GET",payload: api.loadDishes(category)});
		dispatch({type: "DISH_SET_CURRENT", payload: category});
	}
}

export function createDish(data){
	return (dispatch, getState) => {

		dispatch({type: "DISH_CREATE_PENDING"});

		api.createDish(data)
		   .then(response => {
		   		dispatch({type: "DISH_CREATE_FULFILLED", payload: response.data});
		   		dispatch(closeModal(DISH_MODAL_ID));
		   })
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "DISH_CREATE_REJECTED"});
		   	});

	}
}

export function deleteDish(id){
	return (dispatch, getState) => {
		dispatch({type: "DISH_DELETE_PENDING", payload: id});
		api.deleteDish(id)
		   .then(res => dispatch({type: "DISH_DELETE_FULFILLED",payload: id}))
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "DISH_DELETE_REJECTED", payload: err});
		   	})
	}
}

export function updateDiscount(data){

	return (dispatch, getState) =>{
		let id = getState().dish.selectedId;
		api.updateDiscount(id, data)
			.then(res => {
				dispatch({type: "DISH_UPDATE", payload: res.data})
				dispatch(closeModal(DISCOUNT_MODAL_ID));
			})
			.catch(err => handleError(err));
	}

}

export function setActiveDish(id){
	return {type:"SET_ACTIVE_DISH", payload: id}
}









