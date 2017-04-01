import api from '../utility/api'

export function getCategories(){
	return{
		type: "CATEGORY_GET_ALL",
		payload: api.loadCategories()
	}
}

export function createCategory(title, image){
	return (dispatch, getState) => {

		dispatch({type: "CATEGORY_CREATE_PENDING"});

		api.createCategory({title, image})
		   .then(response => {
		   		dispatch({type: "CATEGORY_CREATE_FULFILLED", payload: response.data});
		   		let modalId = getState().modal.id;
		   		console.log(getState());
		   		dispatch({type: "CLOSE_MODAL", payload: modalId});
		   })
		   .catch(err => dispatch({type: "CATEGORY_CREATE_REJECTED"}));

	}
}

export function deleteCategory(id){
	return (dispatch, getState) => {
		dispatch({type: "CATEGORY_DELETE_PENDING", payload: id});
		api.deleteCategory(id)
		   .then(res => dispatch({type: "CATEGORY_DELETE_FULFILLED",payload: id}))
		   .catch(err => dispatch({type: "CATEGORY_DELETE_REJECTED", payload: err}))
	}
}

