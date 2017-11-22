import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_CATEGORY_POSTS = 'fetch_category_posts';

const ROOT_URL = 'http://localhost:3001';

const apiRequest = axios.create({
  headers: { 'Authorization': 'nagibAuth' }
})

// Here we're going to making a request to an API
// We're using axios

export function fetchPosts(){
  const request = apiRequest.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchCategoryPosts(category){
  const request = apiRequest.get(`${ROOT_URL}/${category}/posts`);
    
    return {
      type: FETCH_CATEGORY_POSTS,
      payload: request
    }
  }