import React from 'react'
import { connect } from "react-redux"
import NotificationSystem from 'react-notification-system'


@connect(store => {
	return {notification: store.notification}
})
export default class NotificationComponent extends React.Component{




	componentDidUpdate(prevProps, prevState) {
		this.refs.notification.addNotification(this.props.notification.data);

	}


	render(){
		return <NotificationSystem ref='notification'/>
	}

}