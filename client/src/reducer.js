import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {reducer as formReducer} from 'redux-form'
import userReducer from 'user/userReducer'
import web3Reducer from 'util/web3/web3Reducer'
import marketReducer from 'market/marketReducer';
import dashboardReducer from 'dashboard/dashboardReducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  market: marketReducer,
  web3: web3Reducer,
  form: formReducer,
  dashboard: dashboardReducer
})

