import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function (state = {}, action) {
  switch(action.type){
    case FETCH_POSTS: 
      // console.log(action.payload.data);
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