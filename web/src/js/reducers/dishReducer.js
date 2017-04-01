export default function reducer (
	state={
		dishes: [],
		currentCategory: null,
		loading: false,
		error: false
	}, action){
	
	switch (action.type){

		case "DISH_SET_CURRENT" :{
			return {...state, currentCategory: action.payload}
		}

// ------------------------------------------------------------------------------------------------------------------------
		case "DISH_GET_PENDING" :{
			return {...state, loading: true, error: false}
		}
		case "DISH_GET_FULFILLED" :{
			return {...state, loading: false, dishes: action.payload.data || []}
		}
		case "DISH_GET_REJECTED" :{
			return {...state, loading: false, error: true}
		}
// ------------------------------------------------------------------------------------------------------------------------
		case "DISH_CREATE_PENDING":{
			return {...state, loading: true, error: false}
		}

		case "DISH_CREATE_FULFILLED":{

			let updated = [].concat(state.dishes);
			if(state.currentCategory == action.payload.categoryId) updated.push(action.payload);
			return {...state, dishes: updated || [], loading: false}
		}

		case "DISH_CREATE_REJECTED":{
			return {...state, loading: false, error: true}
		}
// ------------------------------------------------------------------------------------------------------------------------
		case "DISH_DELETE_PENDING":{
			return {...state, loading:true, error:false}
		}

		case "DISH_DELETE_FULFILLED":{
			let updated = state.dishes.filter( a => a.id != action.payload);
			return {...state, loading:false, dishes: updated}
		}

		case "DISH_DELETE_REJECTED":{
			return {...state, loading: false, error: true}
		}


	}
	
	return state;
}