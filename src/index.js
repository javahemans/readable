import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bulma/css/bulma.css';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

const store = createStoreWithMiddleware(reducers,{},composeEnhancers)
 


ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
