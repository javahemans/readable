import _ from 'lodash';
import { FETCH_POSTS, FETCH_CATEGORY_POSTS } from '../actions';

export default function (state = {}, action) {
  switch(action.type){
    case FETCH_POSTS: 
      // console.log(action.payload.data);
      // _.mapKeys (Lodash) here to covert array to object.
      console.log("IN FETCH_POSTS REDUCER");      
      return ( _.chain(action.payload.data)
              .mapKeys('id')
              .orderBy(val => val.voteScore, ['desc'])
              .value()
      );
      case FETCH_CATEGORY_POSTS: 
      console.log("IN FETCH_CATEGORY_POSTS REDUCER");
      // _.mapKeys (Lodash) here to covert array to object.
      return ( _.chain(action.payload.data)
              .mapKeys('id')
              .orderBy(val => val.voteScore, ['desc'])
              .value()
      );

      default: 
      return state;
  }
}