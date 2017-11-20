import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bulma/css/bulma.css';
import { BrowserRouter, Route } from 'react-router-dom';
 
ReactDOM.render(
<BrowserRouter>
  <div>
    <Route exact path="/" component={App} />
  </div>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
