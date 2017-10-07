'use strict';
const React = require('react');
const { render } = require('react-dom');
const { createStore,compose } = require('redux');
const { Router,Route,IndexRoute,browserHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
const RootReducer = require('../reducers/root_reducer');
const Provider = require('../components/provider');
const AppLayout = require('../components/app_layout');
const UserCreate = require('../components/user_create');

const rehydratedInitialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer,rehydratedInitialState,composeEnhancers());
const history = syncHistoryWithStore(browserHistory,store);

const App = function(){
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppLayout}>
          <IndexRoute component={UserCreate}/>
        </Route>
      </Router>
    </Provider>
  );
};



render(<App />,document.getElementById('main'));