import * as actionTypes from '../types/user-action-types'

const initialState = {
  is_sign_in: false,
  socket : {},
  posts : [],
  loading : false
}

const loginFormReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.CONNECT_TO_SOCKET : {
      const newState = {...state};
      const socket = actions.socket;
      newState.socket = socket;
      console.log('connect');
      
      return newState;
    }
    case actionTypes.QUERY_SEARCH : {
      const newState = {...state};
      const posts = actions.posts;
      newState.posts = posts;
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
      const update = actions.update;
      const posts = [...newState.posts];
      const indx = posts.findIndex(e => e.id === update.id);
      if(indx<0) return newState;
      posts[indx].loading = true;
      newState.posts = posts;
      return newState;
    }
    default:
      return state
  }
}

export default loginFormReducer 
