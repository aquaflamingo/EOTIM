import { createBrowserHistory } from 'history'

import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'
import createRootReducer from './reducer'
export const history = createBrowserHistory()

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    createRootReducer(history), // root reducer with router state
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware,
      ),
    ),
  )

export default store 
