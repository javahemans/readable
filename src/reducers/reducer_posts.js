import _ from 'lodash';
import { FETCH_POSTS, FETCH_CATEGORY_POSTS, FETCH_POST_DETAIL } from '../actions';

export default function (state = {}, action) {
  switch(action.type){
    case FETCH_POSTS: 
      // console.log(action.payload.data);
      // _.mapKeys (Lodash) here to covert array to object.
      console.log("FETCH_POSTS");      
      return ( _.chain(action.payload.data)
              .mapKeys('id')
              .orderBy(val => val.voteScore, ['desc'])
              .value()
      );
      case FETCH_CATEGORY_POSTS: 
      console.log("FETCH_CATEGORY_POSTS");
      // _.mapKeys (Lodash) here to covert array to object.
      return ( _.chain(action.payload.data)
              .mapKeys('id')
              .orderBy(val => val.voteScore, ['desc'])
              .value()
      );
      
      case FETCH_POST_DETAIL: 
      console.log("FETCH_POST_DETAIL");
      // _.mapKeys (Lodash) here to covert array to object.
      return action.payload.data;
      default: 
      return state;
  }
}