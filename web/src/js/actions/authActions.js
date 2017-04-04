import api from '../utility/api'

export function login(login, password){
	return(dispatch, getState) => {
		api.login(login, password)
		   .then(result =>{
		   		console.log(result.data);
		   		dispatch(checkToken(result.data.access_token));
		   })
		   .catch(err => console.log(err));
	}
}

export function checkToken(token){
	return(dispatch, getState) => {
		api.checkToken(token)
		   .then(result => console.log(result.data))
		   .catch(err => console.log(err));
	}
}


