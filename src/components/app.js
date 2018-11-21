import React from 'react'
import ExchangeRates from './exchange_rates'
import ExchangeRatesReload from './exchange_rates_reload'
import Errors from './errors'
import styles from '../assets/css/app.css'
import mp from '../assets/css/shared/margins_paddings.css'

const App = () => (
  <div className={styles.app}>
    <div className={`${mp.paddingLarge} ${styles.header}`}>
      <div className={mp.marginBottom}><h1>Exchange Rates</h1></div>
      <ExchangeRatesReload />
    </div>
    <Errors />
    <div className={`${mp.padding} ${styles.container}`}>
      <ExchangeRates />
    </div>
  </div>
)

export default App
