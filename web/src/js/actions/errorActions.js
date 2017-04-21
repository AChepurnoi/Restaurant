import {notify} from './notificationActions'
import {refreshToken} from './authActions'
export function handleError(err){

	return (dispatch, getState) => {
		console.log(err.response);
		
		if(err.response.status == 401){
			dispatch(refreshToken());
			dispatch(notify("Retry", 'Please, try again', 'error'));
			return;
		}
		const {response} = err;
		const message = response.data.error_description || response.data.message;
		dispatch(notify("Error", message, 'error'));
	}

}