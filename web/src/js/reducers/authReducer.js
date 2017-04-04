export default function reducer (
	state={
		userId: false
	}, action){
	
	switch (action.type){

		case "LOGIN_PENDING":{
			return {...state, open: true, id: action.payload}
		}

		case "LOGIN_FULFILLED":{
			return {...state, open: false, id: action.payload}
		}

		case "LOGIN_REJECTED":{
			return {...state, open: false, id: action.payload}
		}

	}
	
	return state;
}