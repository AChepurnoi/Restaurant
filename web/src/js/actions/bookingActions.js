import api from '../utility/api'
import {closeModal} from './modalActions'
import {notify} from './notificationActions'
import {handleError} from './errorActions'
import {BOOK_MODAL_ID} from '../const'
export function loadTables(){

	return (dispatch, getState) => {
		api.loadTables()
		   .then(response => dispatch({type:"TABLES_GET_ALL_FULFILLED", payload: response}))
		   .catch(err => dispatch(handleError(err)))
	}
}

export function createTable(posx, posy){
	return (dispatch, getState) => {

		api.createTable({posx, posy})
		   .then(response => {
		   		dispatch({type: "TABLES_CREATE_FULFILLED", payload: response.data});
		   		dispatch(notify('Info', 'Table placed', 'success'));
		   })
		   .catch(err => dispatch(handleError(err)));

	}
}

export function deleteTable(id){
	return (dispatch, getState) => {
		api.deleteTable(id)
		   .then(res => {
			   	dispatch({type: "TABLES_DELETE_FULFILLED",payload: id})
			   	dispatch(notify('Info', 'Table deleted', 'success'));
		   })
		   .catch(err =>dispatch(handleError(err)))
	}
}

export function loadBooking(table){
	return (dispatch, getState) => {
		api.loadBooking(table)
		   .then(res => dispatch({type: "BOOKING_LOAD_FULFILLED",payload: res.data}))
		   .catch(err => dispatch(handleError(err)))
	}
}

export function bookTable(table, data){
	return (dispatch, getState) => {
		api.bookTable(table, data)
		   .then(res => {
		   	dispatch({type: "BOOK_FULFILLED",payload: res.data})
		   	dispatch(closeModal(BOOK_MODAL_ID));
		   	dispatch(notify('Info', 'Table booked', 'success'));
		   })
		   .catch(err =>dispatch(handleError(err)))
	}
}



export function selectTable(table){
	return {
		type:"SELECT_TABLE",
		payload: table
	}
}

export function deselectTable(table){
	return {
		type:"DESELECT_TABLE",
		payload: table
	}
}
