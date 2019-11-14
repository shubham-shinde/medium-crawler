import * as actionTypes from '../types/user-action-types'

const initialState = {
  query : '',
  socket : {},
  posts : [],
  related : [],
  loading : false
}

const loginFormReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.CONNECT_TO_SOCKET : {
      const newState = {...state};
      const socket = actions.socket;
      newState.socket = socket;      
      return newState;
    }
    case actionTypes.UPDATE_QUERY : {
      const newState = {...state};
      newState.query = actions.query;      
      return newState;
    }
    case actionTypes.PUT_LOADER : {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
    case actionTypes.QUERY_SEARCH : {
      const newState = {...state};
      const posts = actions.posts;
      const related = actions.related;
      newState.posts = posts;
      newState.related = related;
      newState.loading = false;
      return newState;
    }
    case actionTypes.LOADED_THIS : {
      const newState = {...state};
      const update = actions.update;
      const posts = [...newState.posts];
      const indx = posts.findIndex(e => e.id === update.id);
      if(indx<0) return newState;
      posts[indx] = update;
      newState.posts = posts;
      return newState;
    }
    case actionTypes.LOADING_THIS : {
      const newState = {...state};
      const id = actions.id;
      const posts = [...newState.posts];
      const indx = posts.findIndex(e => e.id === id);
      if(indx<0) return newState;
      const post = {...posts[indx]};
      post.crawling = true;
      posts[indx] = post;
      newState.posts = posts;
      return newState;
    }
    default:
      return state
  }
}

export default loginFormReducer 
