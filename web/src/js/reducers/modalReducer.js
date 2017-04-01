export default function reducer (
	state={
		open: false,
		id: null
	}, action){
	
	switch (action.type){

		case "OPEN_MODAL":{
			return {...state, open: true, id: action.payload}
		}

		case "CLOSE_MODAL":{
			return {...state, open: false, id: action.payload}
		}

	}
	
	return state;
}