import api from '../utility/api'
import {closeModal} from './modalActions'
import {notify} from './notificationActions'
import {handleError} from './errorActions'
import {BOOK_MODAL_ID} from '../const'
export function loadTables(){

	return (dispatch, getState) => {
		dispatch({type:"TABLES_GET_ALL_PENDING"});
		api.loadTables()
		   .then(response => {
		   		dispatch({type:"TABLES_GET_ALL_FULFILLED", payload: response});
		   }).catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type:"TABLES_GET_ALL_REJECTED"})
		   })
	}
}

export function createTable(posx, posy){
	return (dispatch, getState) => {

		dispatch({type: "TABLES_CREATE_PENDING"});

		api.createTable({posx, posy})
		   .then(response => {
		   		dispatch({type: "TABLES_CREATE_FULFILLED", payload: response.data});
		   		dispatch(notify('Table created', 'Table created OK', 'success'));
		   })
		   .catch(err => {
		   		dispatch(handleError(err))
		   		dispatch({type: "TABLES_CREATE_REJECTED"})
		   });

	}
}

export function deleteTable(id){
	return (dispatch, getState) => {
		dispatch({type: "TABLES_DELETE_PENDING", payload: id});
		api.deleteTable(id)
		   .then(res => {
			   	dispatch({type: "TABLES_DELETE_FULFILLED",payload: id})
			   	dispatch(notify('Table deleted', 'Table deleted OK', 'success'));
		   })
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "TABLES_DELETE_REJECTED", payload: err})
		   })
	}
}

export function loadBooking(table){
	return (dispatch, getState) => {
		dispatch({type: "BOOKING_LOAD_PENDING", payload: table});
		api.loadBooking(table)
		   .then(res => dispatch({type: "BOOKING_LOAD_FULFILLED",payload: res.data}))
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "BOOKING_LOAD_REJECTED", payload: err})
		   	})
	}
}

export function bookTable(table, data){
	return (dispatch, getState) => {
		dispatch({type: "BOOK_PENDING", payload: table});
		api.bookTable(table, data)
		   .then(res => {
		   	dispatch({type: "BOOK_FULFILLED",payload: res.data})
		   	dispatch(closeModal(BOOK_MODAL_ID));
		   	dispatch(notify('Table booked', 'Table booked OK', 'success'));
		   })
		   .catch(err => {
		   		dispatch(handleError(err));
		   		dispatch({type: "BOOK_REJECTED", payload: err})
		   	})
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
