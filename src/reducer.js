import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import debugReducer from './layouts/debug/debugReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  debug: debugReducer,
  web3: web3Reducer,
  form: formReducer
})

export default reducer
