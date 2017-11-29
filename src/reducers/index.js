import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  // state: (state = {}) => state 
  posts: PostsReducer,
  comments: CommentsReducer,
  form: formReducer
})

export default rootReducer;