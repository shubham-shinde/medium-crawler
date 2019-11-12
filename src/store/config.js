import { createBrowserHistory } from 'history'
import { compose, createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import reduxStateImmutableInvariant from 'redux-immutable-state-invariant'
import rootReducer from './root-reducer'

export const history = createBrowserHistory()
const connectRouterHistory = connectRouter(history)

function configureStoreProd (initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    thunk,
    reactRouterMiddleware
  ]

  return createStore(
    connectRouterHistory(rootReducer),
    initialState,
    compose(applyMiddleware(...middlewares))
  )
}

function configureStoreDev (initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    reduxStateImmutableInvariant(),
    thunk,
    reactRouterMiddleware
  ]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    connectRouterHistory(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    module.hot.accept('./root-reducer', () => {
      const nextRootReducer = require('./root-reducer').default
      store.replaceReducer(connectRouterHistory(nextRootReducer))
    })
  }
  return store
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev
export default configureStore
