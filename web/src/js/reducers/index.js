import { combineReducers } from "redux"
import category from './categoryReducer'
import modal from './modalReducer'
import dish from './dishReducer'
import auth from './authReducer'
import booking from './bookingReducer'
import notification from './notificationReducer'
import cart from './cartReducer'
import loader from './loaderReducer'

export default combineReducers({category,modal, dish, auth, booking, notification, cart, loader})
