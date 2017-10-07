'use strict';
const React = require('react');
const { render } = require('react-dom');
const { createStore,compose } = require('redux');
const { Router,Route,IndexRoute,IndexRedirect,browserHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
const Immutable = require('immutable');
const RootReducer = require('../reducers/root_reducer');
const Provider = require('../components/provider');
const AppLayout = require('../components/app_layout');
const VideosIndex = require('../components/videos_index');
const ResourceGroupsIndex = require('../components/resource_groups_index');

const rehydratedInitialState = JSON.parse(document.getElementById('main').attributes['data-initial-state'].value);

rehydratedInitialState.user = Immutable.fromJS(rehydratedInitialState.user);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer,rehydratedInitialState,composeEnhancers());
const history = syncHistoryWithStore(browserHistory,store);

const App = function(){
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppLayout}>
          <IndexRoute component={VideosIndex}/>
          <Route path="/resources" component={ResourceGroupsIndex}/>
        </Route>
      </Router>
    </Provider>
  );
};



render(<App />,document.getElementById('main'));