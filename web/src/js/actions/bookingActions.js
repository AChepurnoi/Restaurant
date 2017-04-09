import api from '../utility/api'


export function loadTables(){

	return (dispatch, getState) => {
		dispatch({type:"TABLES_GET_ALL_PENDING"});
		api.loadTables()
		   .then(response => {
		   		dispatch({type:"TABLES_GET_ALL_FULFILLED", payload: response});
		   }).catch(err => {
		   		console.log(err);
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
		   })
		   .catch(err => dispatch({type: "TABLES_CREATE_REJECTED"}));

	}
}

export function deleteTable(id){
	return (dispatch, getState) => {
		dispatch({type: "TABLES_DELETE_PENDING", payload: id});
		api.deleteTable(id)
		   .then(res => dispatch({type: "TABLES_DELETE_FULFILLED",payload: id}))
		   .catch(err => dispatch({type: "TABLES_DELETE_REJECTED", payload: err}))
	}
}

export function loadBooking(table){
	return (dispatch, getState) => {
		dispatch({type: "BOOKING_LOAD_PENDING", payload: table});
		api.loadBooking(table)
		   .then(res => dispatch({type: "BOOKING_LOAD_FULFILLED",payload: res.data}))
		   .catch(err => dispatch({type: "BOOKING_LOAD_REJECTED", payload: err}))
	}
}

export function bookTable(table, data){
	return (dispatch, getState) => {
		dispatch({type: "BOOK_PENDING", payload: table});
		api.bookTable(table, data)
		   .then(res => dispatch({type: "BOOK_FULFILLED",payload: res.data}))
		   .catch(err => dispatch({type: "BOOK_REJECTED", payload: err}))
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
