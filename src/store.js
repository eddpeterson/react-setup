import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)

// explicit about what middlewares go to production
const middlewares = (process.env.NODE_ENV === 'production')
  ? [thunk]
  : [thunk, logger]

// create store only once
let store = null
const configureStore = () => {
  if (store) return store
  store = createStore(
  reducer,
  compose(applyMiddleware(...middlewares)))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
