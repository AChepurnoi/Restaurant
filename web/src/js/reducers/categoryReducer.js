export default function reducer (
	state={
		categories:[],
		selected: null,
		loading: false,
		error: false
	}, action){
	
	switch (action.type){

		case "CATEGORY_SET_CURRENT" :{
			return {...state, selected: action.payload}
		}

		case "CATEGORY_GET_ALL_PENDING":{
			return {...state, error: false, loading:true}
		}

		case "CATEGORY_GET_ALL_FULFILLED":{
			return {...state, categories: action.payload.data || [], loading: false}
		}

		case "CATEGORY_GET_ALL_REJECTED":{
			return {...state, loading: false, error: true}
		}


		case "CATEGORY_CREATE_PENDING":{
			return {...state, loading:true, error:false}
		}

		case "CATEGORY_CREATE_FULFILLED":{
			let updated = [].concat(state.categories);
			updated.push(action.payload);
			return {...state, loading:false, categories: updated}
		}

		case "CATEGORY_CREATE_REJECTED":{
			return {...state, loading: false, error: true}
		}



		case "CATEGORY_DELETE_PENDING":{
			return {...state, loading:true, error:false}
		}

		case "CATEGORY_DELETE_FULFILLED":{
			let updated = state.categories.filter( a => a.id != action.payload);
			return {...state, loading:false, categories: updated}
		}

		case "CATEGORY_DELETE_REJECTED":{
			return {...state, loading: false, error: true}
		}

	}
	
	return state;
}