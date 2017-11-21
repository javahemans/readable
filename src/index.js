import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bulma/css/bulma.css';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose;

const store = createStoreWithMiddleware(reducers,{},composeEnhancers)
 


ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
