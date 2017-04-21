export function notify(title, message, level){
	return{
		type: "NOTIFY",
		payload: {title, message, level, position:'tr', autoDismiss: 5}
	}
}


export function showLoader(){
	return {type: "LOADER_SHOW"}
}


export function hideLoader(){
	return {type: "LOADER_HIDE"}
}