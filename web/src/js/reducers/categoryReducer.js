export default function reducer (
	state={
		items:[],
		loading: false,
		error: false
	}, action){
	
	switch (action.type){
		case "CATEGORY_GET_PENDING":{
			return {...state, error: false, loading:true}
		}

		case "CATEGORY_GET_FULFILLED":{
			return {...state, items: action.payload.data || [], loading: false}
		}

		case "CATEGORY_GET_REJECTED":{
			return {...state, loading: false, error: true}
		}
	}
	
	return state;
}