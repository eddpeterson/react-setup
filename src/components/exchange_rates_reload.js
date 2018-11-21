import React from 'react'
import { connect } from 'react-redux'
import { loadExchangeRates } from '../actions'
import styles from '../assets/css/exchange_rates_reload.css'

const ExchangeRatesReload = ({ ratesInProgress, onClick }) => {
  const reloadCss = (ratesInProgress)
    ? `${styles.reloadSingle} ${styles.animate}`
    : styles.reloadSingle
  return (
    <div>
      <div
        className={styles.button}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex="0"
      >
        <div>Get latest</div>
        <div className={reloadCss} />
      </div>
    </div>
  )
}

const mapState = ({ ratesInProgress }) => ({ ratesInProgress })
const mapActions = { onClick: loadExchangeRates }
export default connect(mapState, mapActions)(ExchangeRatesReload)
