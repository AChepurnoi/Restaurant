import api from '../utility/api'
import {handleError} from './errorActions'

export function getDishes(category){
	return(dispatch, getState) => {
		dispatch({type: "DISH_GET",payload: api.loadDishes(category)});
		dispatch({type: "DISH_SET_CURRENT", payload: category});
	}
}

export function createDish(title, description, categoryId, image){
	return (dispatch, getState) => {

		dispatch({type: "DISH_CREATE_PENDING"});

		api.createDish({title, description, categoryId, image})
		   .then(response => {
		   		dispatch({type: "DISH_CREATE_FULFILLED", payload: response.data});
		   		let modalId = getState().modal.id;
		   		dispatch({type: "CLOSE_MODAL", payload: modalId});
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