export default function reducer (
	state={
		tables:[],
		bookings:[],
		selectedTable: null,
		loading: false,
		error: false
	}, action){
	
	switch (action.type){


		case "TABLES_GET_ALL_FULFILLED":{
			return {...state, tables: action.payload.data || [], loading: false}
		}


		case "TABLES_CREATE_FULFILLED":{
			let updated = [].concat(state.tables);
			updated.push(action.payload);
			return {...state, loading:false, tables: updated}
		}


// ----------------------------------------------------

		case "TABLES_DELETE_FULFILLED":{
			let updated = state.tables.filter( a => a.id != action.payload);
			return {...state, loading:false, tables: updated}
		}

// --------------------------------------------------------

		case "BOOKING_LOAD_FULFILLED":{
			return {...state, loading: false, bookings: action.payload}
		}

// ----------------------------------------------------------

		case "SELECT_TABLE":{
			return {...state, selectedTable: action.payload}
		}

		case "DESELECT_TABLE":{
			return {...state, selectedTable: null}
		}

	}
	
	return state;
}