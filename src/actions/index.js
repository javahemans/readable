import axios from 'axios';
import { v4 } from 'uuid';

import * as Types from './actionTypes';

// console.log("Action Types are, ", Types);
const ROOT_URL = 'http://localhost:3001';

const apiRequest = axios.create({
  headers: { 'Authorization': 'nagibAuth' }
})

export function getCategories(){
  const request = apiRequest.get(`${ROOT_URL}/categories`);

  return {
    type: Types.GET_CATEGORIES,
    payload: request
  }
}


export function fetchPosts(){
  const request = apiRequest.get(`${ROOT_URL}/posts`);

  return {
    type: Types.FETCH_POSTS,
    payload: request
  }
}

export function fetchCategoryPosts(category){
  const request = apiRequest.get(`${ROOT_URL}/${category}/posts`)
  // const request = _.filter(request1, (o) => { return o.category === category});
  // console.log("Fetch Category Action Creator: ", category, request1, request);
  
    return {
      type: Types.FETCH_CATEGORY_POSTS,
      payload: request
    }
}

export function fetchPostDetail(id){
  const request = apiRequest.get(`${ROOT_URL}/posts/${id}`);
    
    return {
      type: Types.FETCH_POST_DETAIL,
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
      type: Types.VOTE_POST,
      payload: request
    }
}

export function orderPostsBy(order) {

  return {
    type: Types.ORDER_POSTS_BY,
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
    type: Types.CREATE_POST,
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
      type: Types.EDIT_POST,
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
      type: Types.DELETE_POST,
      payload: data
  }
}

export function fetchComments(id){
  const request = apiRequest.get(`${ROOT_URL}/posts/${id}/comments`);

  return {
    type: Types.FETCH_COMMENTS,
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
      type: Types.VOTE_COMMENT,
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
      type: Types.CREATE_COMMENT,
      payload: request
    }
  }
  
  export function toggleCommentView(commentId) {
    
      return {
        type: Types.TOGGLE_COMMENT_EDIT,
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
        type: Types.EDIT_COMMENT,
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
          type: Types.DELETE_COMMENT,
          payload: data
      }
    }
