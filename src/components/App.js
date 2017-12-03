import React from 'react';
import './App.css';
import moment from 'moment';
import _ from 'lodash';
import { Route, Switch } from 'react-router-dom';
import Header from './app_header'
import PostsList from './posts_list';
import PostsNew from './posts_new';
import PostDetail from './post_detail';
import PostsEdit from './posts_edit';
import NotFound from './404.js';

import { v4 } from 'uuid';

window.v4 = v4;
window._ = _; // Debugging lodash in console.
window.moment = moment; // Debugging moment in console.

 const App = () =>  {
    
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path ='/' component={PostsList} />
          <Route exact path ='/posts/new' component={PostsNew} />
          <Route path ='/:category/:id/edit' component={PostsEdit} />
          <Route path ='/:category/:id' component={PostDetail} />
          <Route path ='/:category' component={PostsList} />
          <Route component={NotFound} />
        </Switch>
          {/* <Route exact path="/:category/posts" render={({match, location}) => (
              <PostsList match={match} location={location}  />
          )} /> */}
      </div>
    );
}

export default App;
