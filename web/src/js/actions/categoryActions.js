import api from '../utility/api'
import {getDishes} from './dishActions'
import {handleError} from './errorActions'


export function getCategories(){

	return (dispatch, getState) => {
		dispatch({type:"CATEGORY_GET_ALL_PENDING"});
		api.loadCategories()
		   .then(response => {
		   		dispatch({type:"CATEGORY_GET_ALL_FULFILLED", payload: response});
		   		let categories = response.data;
		   		if(!categories.length) return;
		   		dispatch(getDishes(categories[0].id));
		   }).catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type:"CATEGORY_GET_ALL_REJECTED"});
		   })
	}
}

export function createCategory(title, image){
	return (dispatch, getState) => {

		dispatch({type: "CATEGORY_CREATE_PENDING"});

		api.createCategory({title, image})
		   .then(response => {
		   		dispatch({type: "CATEGORY_CREATE_FULFILLED", payload: response.data});
		   		let modalId = getState().modal.id;
		   		dispatch({type: "CLOSE_MODAL", payload: modalId});
		   })
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "CATEGORY_CREATE_REJECTED"});
		   	});

	}
}

export function deleteCategory(id){
	return (dispatch, getState) => {
		dispatch({type: "CATEGORY_DELETE_PENDING", payload: id});
		api.deleteCategory(id)
		   .then(res => dispatch({type: "CATEGORY_DELETE_FULFILLED",payload: id}))
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "CATEGORY_DELETE_REJECTED", payload: err});
		   	})
	}
}

