import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import * as components from './components'

import ExchangeRatesReload from './exchange_rates_reload'
import Errors from './errors'
import styles from '../assets/css/app.css'
import mp from '../assets/css/shared/margins_paddings.css'

const App = ({ page }) => {
  const Component = components[page]
  return (
    <div className={styles.app}>
      <div className={`${mp.paddingLarge} ${styles.header}`}>
        <div className={mp.marginBottom}><h1>Exchange Rates</h1></div>
        <ExchangeRatesReload />
        <Link to={{ type: 'loc_home' }}>Go to home</Link>
        <Link to={{ type: 'loc_autoload' }}>Go to autoload</Link>
      </div>
      <Errors />
      <div className={`${mp.padding} ${styles.container}`}>
        <Component />
      </div>
    </div>
  )
}

const mapState = ({ page }) => ({ page })
const connectedApp = connect(mapState)(App)
export default hot(module)(connectedApp)
