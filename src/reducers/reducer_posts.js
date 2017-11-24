import _ from 'lodash';
import { FETCH_POSTS, FETCH_CATEGORY_POSTS, FETCH_POST_DETAIL, VOTE_POST } from '../actions';

export default function (state = {}, action) {
  switch(action.type){

    case FETCH_POSTS: 
      // console.log(action.payload.data);
      // _.mapKeys (Lodash) here to covert array to object.
      // Default should order the results by voteScore, descending
      // But this will be done on a component level: _.orderBy(val => val.voteScore, ['desc'])

      const postData = _.mapKeys(action.payload.data, 'id');
      console.log("FETCH_POSTS:R ", action.payload.data, postData, state); // Note: former is array, latter is object.
      // console.log("FETCH_POSTS:R ");
      // const y =  {...state, ...postData};
      // console.log("Y is: ", y);
      return action.payload.data;
      // return {...state, ...postData};

    case FETCH_CATEGORY_POSTS: 
      const postCategoryData = _.mapKeys(action.payload.data, 'id');
      console.log("FETCH_CATEGORY_POSTS:R", action.payload.data, postCategoryData, state);      
      return action.payload.data;      
      // return {...state, ...postCategoryData};
      
    case FETCH_POST_DETAIL: 
      const postDetailData = _.mapKeys([action.payload.data], 'id');    
      console.log("FETCH_POST_DETAIL:R ", postDetailData, action.payload.data);
      return postDetailData;
      // return {...state, ...postDetailData};

    case VOTE_POST: 
      const postVoteData = _.mapKeys(action.payload.data, 'id');    
      console.log("VOTE_POST:R ", action.payload.data, state);
      // return postVoteData;
      return {...state, ...postVoteData};

    default: 
      return state;
  }
}