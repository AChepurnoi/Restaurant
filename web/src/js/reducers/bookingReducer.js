export default function reducer (
	state={
		tables:[],
		bookings:[],
		selectedTable: null,
		loading: false,
		error: false
	}, action){
	
	switch (action.type){

		case "TABLES_GET_ALL_PENDING":{
			return {...state, error: false, loading:true}
		}

		case "TABLES_GET_ALL_FULFILLED":{
			return {...state, tables: action.payload.data || [], loading: false}
		}

		case "TABLES_GET_ALL_REJECTED":{
			return {...state, loading: false, error: true}
		}


		case "TABLES_CREATE_PENDING":{
			return {...state, loading:true, error:false}
		}

		case "TABLES_CREATE_FULFILLED":{
			let updated = [].concat(state.tables);
			updated.push(action.payload);
			return {...state, loading:false, tables: updated}
		}

		case "TABLES_CREATE_REJECTED":{
			return {...state, loading: false, error: true}
		}

// ----------------------------------------------------

		case "TABLES_DELETE_PENDING":{
			return {...state, loading:true, error:false}
		}

		case "TABLES_DELETE_FULFILLED":{
			let updated = state.tables.filter( a => a.id != action.payload);
			return {...state, loading:false, tables: updated}
		}

		case "TABLES_DELETE_REJECTED":{
			return {...state, loading: false, error: true}
		}

// --------------------------------------------------------

		case "BOOKING_LOAD_PENDING":{
			return {...state, loading: true, error: false}
		}

		case "BOOKING_LOAD_FULFILLED":{
			return {...state, loading: false, bookings: action.payload}
		}

		case "BOOKING_LOAD_REJECTED":{
			return {...state, loading: false, error: true}
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