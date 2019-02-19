import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
// import getWeb3 from 'util/web3/getWeb3'

// Layouts
import App from './App'

import Home from './layouts/Home'
import Dashboard from './layouts/Dashboard'

// import Marketplace from './layouts/Marketplace'
// import NewTransaction from './layouts/NewTransaction'
// import SearchTransaction from './layouts/SearchTransaction'

// Redux Store
// import store from './store'

// Initialize react-router-redux.
// const history = syncHistoryWithStore(browserHistory, store)
const history = undefined
// Initialize web3 and set in Redux.
// getWeb3
// .then(results => {
//   console.log('Web3 initialized!')
// })
// .catch(() => {
//   console.log('Error in web3 initialization.')
// })

ReactDOM.render((
    // <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={Dashboard} />
          {/* <Route path="profile" component={Profile} /> */}
          {/* <Route path="marketplace" component={Marketplace} />
          <Route path="marketplace/new" component={NewTransaction} />
          <Route path="marketplace/search" component={SearchTransaction} /> */}
        </Route>
      </Router>
    // </Provider>
  ),
  document.getElementById('root')
)
