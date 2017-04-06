export default function reducer (
	state={
		tables:[],
		bookings:[],
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

	}
	
	return state;
}