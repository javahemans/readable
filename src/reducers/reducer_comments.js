import _ from 'lodash';
import { 
  FETCH_COMMENTS, FETCH_COMMENTS_PENDING, FETCH_COMMENTS_FULFILLED,
  VOTE_COMMENT, VOTE_COMMENT_FULFILLED 
 } from '../actions';

const initialState = {
}

export default function (state = initialState, action) {
  console.log("Comments Reducer Action Received", action);
  
  switch(action.type){

    case FETCH_COMMENTS_FULFILLED:       // _.mapKeys (Lodash) here to covert array to object.    
      const commentData = _.mapKeys(action.payload.data, 'id');
      console.log("FETCH_COMMENTS:R ", action.payload.data, commentData, state); // Note: former is array, latter is object.
      return {...state, comments: {...state.comments, ...commentData } };

    // case FETCH_POST_DETAIL_FULFILLED: 
      // NB: action.payload.data here returns an object, so we coerce it back into an array
      // What happens if multiple objects are returned? We'll need some logic here to check that
      // const postDetailData = _.mapKeys([action.payload.data], 'id');    
      // console.log("FETCH_POST_DETAIL:R ", action.payload.data, postDetailData, state);
      // return postDetailData;
      // return {...state, lists: {...state.lists, ...postDetailData }};

    case VOTE_COMMENT_FULFILLED: 
      const commentVoteData = _.mapKeys([action.payload.data], 'id');    
      console.log("COMMENT_POST:R ", action.payload.data, commentVoteData, state);
      return {...state, comments: {...state.comments, ...commentVoteData }};

    // case EDIT_POST:
      // console.log("EDIT Post Reducer state is, ", state, action.payload);
      // return {...state, lists: {...state.lists, [action.payload.id]: action.payload}};

    // case DELETE_POST:
      // const newState = _.omit(state.lists, action.payload.id);
      // console.log("Delete Post Reducer: payload, state, newState, ", action.payload, state, newState);
      // return {...state, lists: {...newState}};
      
    default: 
      return state;
  }
}