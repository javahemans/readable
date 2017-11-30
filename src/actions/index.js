import axios from 'axios';
import { v4 } from 'uuid';

// PostsReducer Actions. (X, X_PENDING, X_FULFILLED) handled
// by redux-promise-middleware.

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';

export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
export const FETCH_CATEGORY_POSTS_PENDING = 'FETCH_CATEGORY_POSTS_PENDING';
export const FETCH_CATEGORY_POSTS_FULFILLED = 'FETCH_CATEGORY_POSTS_FULFILLED';

export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';
export const FETCH_POST_DETAIL_PENDING = 'FETCH_POST_DETAIL_PENDING';
export const FETCH_POST_DETAIL_FULFILLED = 'FETCH_POST_DETAIL_FULFILLED';

export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_PENDING = 'VOTE_POST_PENDING';
export const VOTE_POST_FULFILLED = 'VOTE_POST_FULFILLED';

export const ORDER_POSTS_BY = 'ORDER_POSTS_BY';
export const ORDER_POSTS_BY_PENDING = 'ORDER_POSTS_BY_PENDING';
export const ORDER_POSTS_BY_FULFILLED = 'ORDER_POSTS_BY_FULFILLED';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_PENDING = 'GET_CATEGORIES_PENDING';
export const GET_CATEGORIES_FULFILLED = 'GET_CATEGORIES_FULFILLED';

// PostsReducer Actions: Handled by Redux Thunk

export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

// CommentsReducer Actions. (X, X_PENDING, X_FULFILLED) handled
// by redux-promise-middleware.

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_PENDING = 'FETCH_COMMENTS_PENDING';
export const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_PENDING = 'FETCH_COMMENT_PENDING';
export const FETCH_COMMENT_FULFILLED = 'FETCH_COMMENT_FULFILLED';

export const VOTE_COMMENT = 'VOTE_COMMENT';
export const VOTE_COMMENT_PENDING = 'VOTE_COMMENT_PENDING';
export const VOTE_COMMENT_FULFILLED = 'VOTE_COMMENT_FULFILLED';

// CommentsReducer Actions: Handled by Redux Thunk

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_FULFILLED = 'CREATE_COMMENT_FULFILLED';
export const TOGGLE_COMMENT_EDIT = 'TOGGLE_COMMENT_EDIT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


const ROOT_URL = 'http://localhost:3001';

const apiRequest = axios.create({
  headers: { 'Authorization': 'nagibAuth' }
})

// Here we're going to making a request to an API
// We're using axios

export function getCategories(){
  const request = apiRequest.get(`${ROOT_URL}/categories`);

  return {
    type: GET_CATEGORIES,
    payload: request
  }
}


export function fetchPosts(){
  const request = apiRequest.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchCategoryPosts(category){
  const request = apiRequest.get(`${ROOT_URL}/${category}/posts`)
  // const request = _.filter(request1, (o) => { return o.category === category});
  // console.log("Fetch Category Action Creator: ", category, request1, request);
  
    return {
      type: FETCH_CATEGORY_POSTS,
      payload: request
    }
}

export function fetchPostDetail(id){
  const request = apiRequest.get(`${ROOT_URL}/posts/${id}`);
    
    return {
      type: FETCH_POST_DETAIL,
      payload: request
    }
}

export function votePost(voteDirection, id){
  const params = 
  { "option" : voteDirection }
  // const request = "voteDir request"
  const request = apiRequest.post(`${ROOT_URL}/posts/${id}`, params);
  // console.log("votePost Action Creator request");  
    return {
      type: VOTE_POST,
      payload: request
    }
}

export function orderPostsBy(order) {

  return {
    type: ORDER_POSTS_BY,
    payload: order
  }
}

export function createPost(values, callback) {

  const id = v4();
  const timestamp = Date.now();
  const valuesPlus = {...values, id, timestamp }
  // console.log("valuesPlus is: ", valuesPlus);

  const request = apiRequest.post(`${ROOT_URL}/posts`, valuesPlus)
  .then(() => callback());
  // console.log("Line 92 request is: ", request );
  return {
    type: CREATE_POST,
    payload: request
  }
}

export function editPost(id , values, callback) {
  
  return dispatch => {
    apiRequest.put(`${ROOT_URL}/posts/${id}`, values)
      .then(res => {
          callback();
          dispatch(editPostSuccess(res.data))        
      });
  }
}

function editPostSuccess(data) {
  return {
      type: EDIT_POST,
      payload: data
  }
}

export function deletePost(id, callback) {

  return dispatch => {
    apiRequest.delete(`${ROOT_URL}/posts/${id}`)
    .then(res => {
      callback()
      dispatch(deletePostSuccess(res.data))            
    });
  }
}

function deletePostSuccess(data) {
  return {
      type: DELETE_POST,
      payload: data
  }
}

export function fetchComments(id){
  const request = apiRequest.get(`${ROOT_URL}/posts/${id}/comments`);

  return {
    type: FETCH_COMMENTS,
    payload: request
  }
}

export function voteComment(voteDirection, commentId){
  const params = 
  { "option" : voteDirection }
  // const request = "voteDir request"
  const request = apiRequest.post(`${ROOT_URL}/comments/${commentId}`, params);
  // console.log("votePost Action Creator request");  
    return {
      type: VOTE_COMMENT,
      payload: request
    }
}

export function createComment(values, parentId) {
  
    const id = v4();
    const timestamp = Date.now();
    const valuesPlus = {...values, id, timestamp, parentId }
    // console.log("valuesPlus is: ", valuesPlus);
  
    const request = apiRequest.post(`${ROOT_URL}/comments`, valuesPlus)
    // console.log("Line 92 request is: ", request );
    return {
      type: CREATE_COMMENT,
      payload: request
    }
  }
  
  export function toggleCommentView(commentId) {
    
      return {
        type: TOGGLE_COMMENT_EDIT,
        payload: commentId
      }
    }      

  export function editComment(values, id) {
    console.log("Edit Comment Values are: ", values);
    return dispatch => {
      apiRequest.put(`${ROOT_URL}/comments/${id}`, values)
        .then(res => {
            dispatch(toggleCommentView(''));               
            dispatch(editCommentSuccess(res.data));
            
          })       
    }
  }

  function editCommentSuccess(data) {
    return {
        type: EDIT_COMMENT,
        payload: data
    }
  }

  export function deleteComment(id) {
    
      return dispatch => {
        apiRequest.delete(`${ROOT_URL}/comments/${id}`)
        .then(res => {
          dispatch(deleteCommentSuccess(res.data))            
        });
      }
    }
    
    function deleteCommentSuccess(data) {
      return {
          type: DELETE_COMMENT,
          payload: data
      }
    }
      

// export const delPost = id => dispatch => {
  // dispatch({type:''});
  // getFromApi().then( data=>dispatch({type:'SETDATA', data}) )
// }

// AT THIS POINT I CAN SEE WHY REDUX-THUNK IS USEFUL
// Redux Promise has been useful for resolving a promise, but not dispatching a series of actions.
// It's not really an issue until you get to edit/update and delete. 
// Phase 1: Merge these changes to Master. It's not great, but functional.
// Phase 2: Update to redux-promise middleware and remove redux-promise. (Branch)
// Phase 3: With Redux-Promise-MiddleWare working, merge to master.
// Phase 4: Add Thunks.