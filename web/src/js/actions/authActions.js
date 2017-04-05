import api from '../utility/api'
import {closeModal} from './modalActions'
import cookie from 'react-cookie';


export function login(login, password){
	return(dispatch, getState) => {
		api.login(login, password)
		   .then(result =>{
		   		console.log(result);
		   		dispatch({type: "SAVE_TOKEN", payload: result.data});
		   		dispatch(closeModal('loginModal'));

		   }).catch(err => console.log(err));
	}
}


export function refreshToken(){
	return(dispatch, getState) => {

		let token = cookie.load("refresh_token");
		if(!token) {
			dispatch({type: 'LOGOUT'});
			return;
		}
		api.refreshToken(token)
		   .then(result => dispatch({type: 'SAVE_TOKEN', payload: result.data}))
		   .catch(err => dispatch({type: 'LOGOUT'}));
	}
}


export function checkLoginValidity(){
	return(dispatch, getState) => {
		let token = cookie.load("access_token");
		if(!token) {
			dispatch({type: 'LOGOUT'});
			return;
		}
		api.checkToken(token)
		   .then(result => dispatch({type: 'TOKEN_VALID', payload: result.data}))
		   .catch(err => dispatch(refreshToken()));
	}
}