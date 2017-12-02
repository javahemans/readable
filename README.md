# Readable
## Udacity React Nanodegree Project #2 (React + Redux)

Readable is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

# Installation

Readable has two parts:

## The Readable Web App (/front-end)
- In the parent folder (this folder), type: `yarn install`. You can also type `npm install`
- `yarn start` or npm equivalent.

## Readable API Server (/api-server)

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

# About the App
- Uses redux-promise-middleware and redux-thunk
- Uses redux-form for field validation
- Uses presentational components where possible
- Uses Bulma for CSS with a mobile responsive design

# Lessons Learned
- I initally used redux-promise and then moved over to redux-promise-middleware for the majority of API calls.
- Redux thunk is also used, but typically only for EDIT and DELETE where there is a clear cut need to handle
- multiple dipatches.
- For everything else, redux-promise-middleware does help reduce boilerplate code
- Component lifecycle methods beyond componentDidMount :)

# Future Stuff
- NavLink highlighting for category
- Deploy this app to ZEIT, Screenshots
- Tidy up mobile UX and move some buttons over to a mobile menu.
- Explore use of _PENDING middleware actions in conjunction with Bulma to have a loading animation on button submit
- Try out an alternate version of this app with Redux-Saga

# Additional Credits
- Advanced React and Redux by Steven Grider - very useful material and insights and I can't recommend his video tutorials enough
- FullStack React Book
- Redux 4 Ways - Really useful blog post