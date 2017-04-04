import api from '../utility/api'
import {closeModal} from './modalActions'


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

export function checkToken(token){
	return(dispatch, getState) => {
		api.checkToken(token)
		   .then(result => console.log(result.data))
		   .catch(err => console.log(err));
	}
}


