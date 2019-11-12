import { combineReducers } from 'redux'
import { reducer as internet } from 'react-redux-internet-connection'
import  user from '../reducers/user-reducer'

const rootReducer = combineReducers({
  user,
  internet
})

export default rootReducer
