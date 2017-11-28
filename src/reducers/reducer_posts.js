import _ from 'lodash';
import { FETCH_POSTS, FETCH_CATEGORY_POSTS, FETCH_POST_DETAIL, VOTE_POST, ORDER_POSTS_BY, GET_CATEGORIES, EDIT_POST, DELETE_POST } from '../actions';

const initialState = {
  orderBy : "voteScore"
}

export default function (state = initialState, action) {
  switch(action.type){

    case GET_CATEGORIES: 
      // console.log("GET_CATEGORIES:R", action.payload.data["categories"], state);      
      return {...state, categories: action.payload.data["categories"]};

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
      return {...state, lists: postCategoryData }; // NB: Here we are overwriting the state with a new result set..
      
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

    case ORDER_POSTS_BY: 
      return {...state, orderBy: action.payload};

    // case CREATE_POST: // Handled by ReduxForm, react-redux-form has a different philosophy here.
      // This will never be called because we put a callback on CreatePost action creator. Is that valid?
      // Is there a way or best pratice to link this reducer aspect to reduxForm createPost?
      // const createPostResult = _.mapKeys([action.payload.data], 'id');        
      // console.log("CREATE_POST:R - Handled by ReduxForm so no action.payload here ", action, state);
      // return {...state};     
      // return {...state, lists: {...state.lists, ...createPostResult}};

      // case EDIT_POST:
      // console.log("EDIT Post Reducer state is, ", state, action.payload.data);
      // return {...state};

    //  case DELETE_POST:
      // return _.omit(state, action.payload);
      // console.log("Delete Post Reducer state is, ", action.payload.data);
      // return {...state};
      
    default: 
      return state;
  }
}