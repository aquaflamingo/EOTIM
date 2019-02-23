import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import getWeb3 from 'util/web3/getWeb3'

// Layouts
import App from './App'

import Home from 'layouts/Home'
import Dashboard from 'layouts/Dashboard'
import Marketplace from 'layouts/Marketplace'
import NewTransaction from 'layouts/NewTransaction'
import SearchTransaction from 'layouts/SearchTransaction'

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
  <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/home" component={Home} />
        <Route path="dashboard" component={Dashboard} />
        {/* <Route path="profile" component={Profile} /> */}
        <Route path="marketplace" component={Marketplace} />
        <Route path="marketplace/new" component={NewTransaction} />
        <Route path="marketplace/search" component={SearchTransaction} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  ),
  document.getElementById('root')
)
