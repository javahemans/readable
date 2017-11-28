import axios from 'axios';
import { v4 } from 'uuid';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_CATEGORY_POSTS = 'fetch_category_posts';
// The FETCHPOSTS logic above can be combined... if category supplied the use that. 
// Does it help to have to have a separate action creator to make things clear?

export const FETCH_POST_DETAIL = 'fetch_post_detail';
export const VOTE_POST = 'vote_post';
export const ORDER_POSTS_BY = 'order_posts_by';
export const GET_CATEGORIES = 'get_categories';
export const CREATE_POST = 'create_post';

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
  console.log("votePost Action Creator request");  
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
  console.log("valuesPlus is: ", valuesPlus);

  const request = apiRequest.post(`${ROOT_URL}/posts`, valuesPlus)
  .then(() => callback());
  console.log("Line 92 request is: ", request );
  return {
    type: CREATE_POST,
    payload: request
  }
}