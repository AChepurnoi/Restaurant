import { combineReducers } from "redux"
import category from './categoryReducer'
import modal from './modalReducer'
import dish from './dishReducer'
import auth from './authReducer'
import booking from './bookingReducer'

export default combineReducers({category,modal, dish, auth, booking})
