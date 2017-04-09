export default function reducer (
	state={
		data: null
	}, action){
	
	switch (action.type){

		case "NOTIFY":{
			return {...state, data: action.payload}
		}

	}
	
	return state;
}