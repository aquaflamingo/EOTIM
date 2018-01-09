import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './dashboard/Dashboard'

import Marketplace from './market/layouts/market/Marketplace'
import NewTransaction from './market/layouts/market/NewTransaction'
import SearchTransaction from './market/layouts/market/SearchTransaction'
import Debug from './debug/Debug'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={Dashboard} />
          {/* <Route path="profile" component={Profile} /> */}
          <Route path="marketplace" component={Marketplace} />
          <Route path="marketplace/new" component={NewTransaction} />
          <Route path="marketplace/search" component={SearchTransaction} />
            <Route path="debug" component={Debug}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
