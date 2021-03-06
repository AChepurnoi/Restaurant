import api from '../utility/api'
import {closeModal} from './modalActions'
import cookie from 'react-cookie';
import {notify} from './notificationActions'
import {handleError} from './errorActions'
import {loadCart} from './cartActions'
import {REGISTER_MODAL_ID, LOGIN_MODAL_ID, CART_MODAL_ID, PROFILE_MODAL_ID} from '../const'

export function login(login, password){
	return(dispatch, getState) => {
		api.login(login, password)
		   .then(result =>{
		   		dispatch({type: "SAVE_TOKEN", payload: result.data});
		   		dispatch(loadUser(login));
		   		dispatch(closeModal(LOGIN_MODAL_ID));

		   }).catch(err => dispatch(handleError(err)));
	}
}


export function register(data){
	return(dispatch, getState) => {
		dispatch({type: "REGISTER_PENDING"});
		api.register(data)
		   .then(result =>{
		   		dispatch({type:"REGISTER_FULFILLED", payload: result.data})
		   		dispatch(closeModal(REGISTER_MODAL_ID));
		   		dispatch(notify('User registered', 'User registered', 'success'))
		   }).catch(err => dispatch(handleError(err)));

	}
}


export function reloadUser(){
	return (dispatch, getState) => {
		let login = getState().auth.user.login;
		dispatch(loadUser(login));
	}
}
export function loadUser(name){
	return (dispatch, getState) => {
		api.loadUser(name)
		   .then(res => dispatch({type: "SAVE_USER", payload: res.data}))
		   .catch(err => dispatch(handleError(err)));
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
		   .then(result => {
		       dispatch({type: 'TOKEN_VALID', payload: result.data});
		       let username = cookie.load("user_name");
		       dispatch(loadUser(username));
		   })
		   .catch(err => dispatch(refreshToken()));
	}
}









