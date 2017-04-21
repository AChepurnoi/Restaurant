import cookie from 'react-cookie';
import api from '../utility/api'

export default function reducer (
	state={
		user: null,
		authorized: false,

	}, action){
	
	switch (action.type){
			//Not pure reducer -> shit
		case "SAVE_TOKEN":{
			let token = action.payload.access_token;
			let refresh = action.payload.refresh_token;
			let expDate = new Date(new Date().getMiliseconds + action.payload.expires_in);
			api.setToken(action.payload.access_token);
			cookie.save('access_token', token, { path: '/' , expires: expDate});
			cookie.save('refresh_token', refresh, {path: '/', expires: expDate});
			return {...state, authorized: true};
		}

		case "ADD_ORDER":{
			let orders = JSON.parse(JSON.stringify(state.user.orders));
			orders.push(action.payload);
			let user = {...state.user};
			user.orders = orders;
			return {...state, user: user}

		}
			//Not pure reducer -> shit
		case "SAVE_USER": {
			cookie.save('user_name', action.payload.login, {path: '/'});
			return {...state, user: action.payload};
		}

			//Not pure reducer -> shit
		case "LOGOUT":{
			api.clearToken();
			cookie.remove('user_name', {path: '/'});
			cookie.remove('access_token',{path: '/'});
			cookie.remove('refresh_token', {path: '/'});
			return {...state, authorized: false, user: null, cart: null};
		}

			//Not pure reducer -> shit
		case "TOKEN_VALID":{
			let token = cookie.load('access_token');
			api.setToken(token);
			return {...state, authorized: true};
		}
	}
	
	return state;
}