export function notify(title, message, level){
	return{
		type: "NOTIFY",
		payload: {title, message, level, position:'tr', autoDismiss: 0}
	}
}

