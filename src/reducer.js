import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import marketReducer from './market/marketReducer';
import dashboardReducer from './dashboard/dashboardReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  market: marketReducer,
  web3: web3Reducer,
  form: formReducer,
  dashboard: dashboardReducer
})

export default reducer
