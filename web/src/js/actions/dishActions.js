import api from '../utility/api'
import {handleError} from './errorActions'
import {closeModal} from './modalActions'
import {DISH_MODAL_ID, DISCOUNT_MODAL_ID} from '../const'
import {notify, showLoader, hideLoader} from './notificationActions'


export function getDishes(category){
	return(dispatch, getState) => {
		if(category == "sales") dispatch({type: "DISH_GET",payload: api.loadSales()});
		else dispatch({type: "DISH_GET",payload: api.loadDishes(category)});
		
		dispatch({type: "DISH_SET_CURRENT_CATEGORY", payload: category})
		dispatch({type: "CATEGORY_SET_CURRENT", payload: category});
		
	}
}

export function createDish(data){
	return (dispatch, getState) => {
		dispatch(showLoader());
		api.createDish(data)
		   .then(response => {
		   		dispatch({type: "DISH_CREATE_FULFILLED", payload: response.data});
		   		dispatch(closeModal(DISH_MODAL_ID));
		   		dispatch(hideLoader());
		   		dispatch(notify('Info', 'Dish created', 'success'));
		   })
		   .catch(err => dispatch(handleError(err)));

	}
}

export function deleteDish(id){
	return (dispatch, getState) => {
		api.deleteDish(id)
		   .then(res => {
		   		dispatch({type: "DISH_DELETE_FULFILLED",payload: id})
		   		dispatch(notify('Info', 'Dish deleted', 'success'));
		   	})
		   .catch(err => dispatch(handleError(err)))
	}
}

export function updateDiscount(data){

	return (dispatch, getState) =>{
		let id = getState().dish.selectedId;
		api.updateDiscount(id, data)
			.then(res => {
				dispatch({type: "DISH_UPDATE", payload: res.data})
				dispatch(closeModal(DISCOUNT_MODAL_ID));
				dispatch(notify('Info', 'Dish discount updated', 'success'));
			})
			.catch(err => handleError(err));
	}

}

export function setActiveDish(id){
	return {type:"SET_ACTIVE_DISH", payload: id}
}


export function loadSales(){
	return (dispatch, getState) => {
		api.loadSales()
			.then(res => dispatch({type:"SALES_GET_FULFILLED", payload: res.data}))
			.catch(err => handleError(err));
			
	}
}








