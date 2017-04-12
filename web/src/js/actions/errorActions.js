import {notify} from './notificationActions'

export function handleError(err){

	return (dispatch, getState) => {
		console.log(err.response);
		const {response} = err;
		const message = response.data.error_description || response.data.message;
		dispatch(notify("Error", message, 'error'));
	}

}