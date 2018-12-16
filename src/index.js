import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import configureStore from './store'

/* eslint no-unused-vars: "off" */
// reseting html and loading our defaults
import resetStyles from './assets/css/shared/reset.css'
import defaultStyles from './assets/css/shared/default.css'

const { store, initialDispatch } = configureStore()
const startWeb = (initialDispatch) => (dispatch) => {
  // do something berore location is routed, e.g, check if user is authenticated
  dispatch({ type: 'start_web', payload: 'e.g. fetch some data' })

  // start router
  initialDispatch()

  // do something after routes are displayed e.g. prefetch data
}

const start = () => {

  store.dispatch(startWeb(initialDispatch))

  return render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  )
}

start()
