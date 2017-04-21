import api from '../utility/api'
import {getDishes} from './dishActions'
import {handleError} from './errorActions'
import {closeModal} from './modalActions'
import {CATEGORY_MODAL_ID} from '../const'
export function getCategories(){

	return (dispatch, getState) => {
		api.loadCategories()
		   .then(response => {
		   		dispatch({type:"CATEGORY_GET_ALL_FULFILLED", payload: response});
		   		let categories = response.data;
		   		if(!categories.length) return;
		   		dispatch(getDishes(categories[0].id));
		   }).catch(err => dispatch(handleError(err)))
	}
}

export function createCategory(data){
	return (dispatch, getState) => {
		api.createCategory(data)
		   .then(response => {
		   		dispatch({type: "CATEGORY_CREATE_FULFILLED", payload: response.data});
		   		dispatch(closeModal(CATEGORY_MODAL_ID));
		   })
		   .catch(err => dispatch(handleError(err)));

	}
}

export function deleteCategory(id){
	return (dispatch, getState) => {
		api.deleteCategory(id)
		   .then(res => dispatch({type: "CATEGORY_DELETE_FULFILLED",payload: id}))
		   .catch(err => dispatch(handleError(err)))
	}
}

