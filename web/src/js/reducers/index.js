import { combineReducers } from "redux"
import category from './categoryReducer'
import modal from './modalReducer'
import dish from './dishReducer'
import auth from './authReducer'
export default combineReducers({category,modal, dish, auth})
