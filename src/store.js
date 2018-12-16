import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { connectRoutes } from 'redux-first-router'
import * as reducers from './reducers'
import routesMap from './routes'

// create store only once
let store = null

const configureStore = (preloadedState) => {
  if (store) return { store }
  
  const options = {
    initialDispatch: false,
  }
  const { reducer, middleware, enhancer, initialDispatch } = connectRoutes(routesMap, options)
  const rootReducer = combineReducers({ ...reducers, location: reducer })
  
  // explicit about what middlewares go to production
  const middlewares = (process.env.NODE_ENV === 'production')
    ? [middleware, thunk]
    : [middleware, thunk, logger]
  const enhancers = compose(enhancer, applyMiddleware(...middlewares))

  store = createStore(rootReducer, preloadedState, enhancers)
  return { store, initialDispatch }
}

export default configureStore
