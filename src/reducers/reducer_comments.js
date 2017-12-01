import _ from 'lodash';
import { 
  FETCH_COMMENTS_FULFILLED,
  VOTE_COMMENT_FULFILLED,
  CREATE_COMMENT_FULFILLED,
  TOGGLE_COMMENT_EDIT,
  EDIT_COMMENT,
  DELETE_COMMENT

 } from '../actions';

const initialState = {
  editingCommentId : ''
}

export default function (state = initialState, action) {
  // console.log("Comments Reducer Action Received", action);
  
  switch(action.type){

    case FETCH_COMMENTS_FULFILLED:       // _.mapKeys (Lodash) here to covert array to object.    
      const commentData = _.mapKeys(action.payload.data, 'id');
      // console.log("FETCH_COMMENTS:R ", action.payload.data, commentData, state); // Note: former is array, latter is object.
      return {...state, comments: commentData };

    // case FETCH_POST_DETAIL_FULFILLED: 
      // NB: action.payload.data here returns an object, so we coerce it back into an array
      // What happens if multiple objects are returned? We'll need some logic here to check that
      // const postDetailData = _.mapKeys([action.payload.data], 'id');    
      // console.log("FETCH_POST_DETAIL:R ", action.payload.data, postDetailData, state);
      // return postDetailData;
      // return {...state, lists: {...state.lists, ...postDetailData }};

    case VOTE_COMMENT_FULFILLED: 
      const commentVoteData = _.mapKeys([action.payload.data], 'id');    
      // console.log("VOTE_COMMENT:R ", action.payload.data, commentVoteData, state);
      return {...state, comments: {...state.comments, ...commentVoteData }};

    case CREATE_COMMENT_FULFILLED: 
      const createData = _.mapKeys([action.payload.data], 'id');    
      // console.log("CREATE_COMMENT:R ", action.payload.data, commentVoteData, state);
      return {...state, comments: {...state.comments, ...createData }};

    case TOGGLE_COMMENT_EDIT:
      return {...state, editingCommentId: action.payload};
    
      
    case EDIT_COMMENT:
      // console.log("EDIT Post Reducer state is, ", state, action.payload);
      return {...state, comments: {...state.comments, [action.payload.id]: action.payload}};

    case DELETE_COMMENT:
      const newState = _.omit(state.comments, action.payload.id);
      // console.log("Delete Post Reducer: payload, state, newState, ", action.payload, state, newState);
      return {...state, comments: {...newState}};
      
    default: 
      return state;
  }
}