import cookie from 'react-cookie';


export default function reducer (
	state={
		user: null,
		authorized: false,

	}, action){
	
	switch (action.type){

		case "SAVE_TOKEN":{
			let token = action.payload.access_token;
			let refresh = action.payload.refresh_token;
			let expDate = new Date(new Date().getMiliseconds + action.payload.expires_in);
			cookie.save('access_token', token, { path: '/' , expires: expDate});
			cookie.save('refresh_token', refresh, {path: '/', expires: expDate});
			return {...state, authorized: true}
		}

		case "LOGOUT":{
			cookie.remove('access_token',{path: '/'});
			cookie.remove('refresh_token', {path: '/'});
			return {...state, authorized: false}
		}

		case "TOKEN_VALID":{
			return {...state, authorized: true}
		}
	}
	
	return state;
}