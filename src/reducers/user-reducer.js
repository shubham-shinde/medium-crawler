import * as actionTypes from '../types/user-action-types'

const initialState = {
  is_sign_in: false,
  socket : {}
}

const loginFormReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.CONNECT_TO_SOCKET : {
      const newState = {...state};
      const socket = actions.socket;
      newState.socket = socket;
      return newState;
    }
    default:
      return state
  }
}

export default loginFormReducer 
