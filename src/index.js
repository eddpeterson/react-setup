import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import configureStore from './store'

/* eslint no-unused-vars: "off" */
// reseting html and loading our defaults
import resetStyles from './assets/css/shared/reset.css'
import defaultStyles from './assets/css/shared/default.css'

const store = configureStore()

const start = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

start()
