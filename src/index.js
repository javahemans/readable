import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import PostsNew from './components/posts_new';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bulma/css/bulma.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose;

const store = createStoreWithMiddleware(reducers,{},composeEnhancers)
 


ReactDOM.render(
<Provider store={store}>
  <BrowserRouter basename="/" >
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/:category/posts" component={App} />
      </Switch>      
    </div>
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
