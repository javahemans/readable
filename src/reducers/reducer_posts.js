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
      // return action.payload.data;
      return {...state, lists: {...state.lists, ...postData } };

    case FETCH_CATEGORY_POSTS: 
      const postCategoryData = _.mapKeys(action.payload.data, 'id');
      console.log("FETCH_CATEGORY_POSTS:R", action.payload.data, postCategoryData, state);      
      // return action.payload.data;      
      return {...state, lists: postCategoryData }; // Q: Here we are overwriting the state with a new result set..
      
    case FETCH_POST_DETAIL: 
      // NB: action.payload.data here returns an object, so we coerce it back into an array
      // What happens if multiple objects are returned? We'll need some logic here to check that
      const postDetailData = _.mapKeys([action.payload.data], 'id');    
      console.log("FETCH_POST_DETAIL:R ", action.payload.data, postDetailData, state);
      // return postDetailData;
      return {...state, lists: {...state.lists, ...postDetailData }};

    case VOTE_POST: 
      const postVoteData = _.mapKeys([action.payload.data], 'id');    
      console.log("VOTE_POST:R ", action.payload.data, postVoteData, state);
      // return postVoteData;
      return {...state, lists: {...state.lists, ...postVoteData }};

    default: 
      return state;
  }
}