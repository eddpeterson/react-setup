import * as api from './api'

export const loadExchangeRates = () => (dispatch, getState) => {
  const { ratesInProgress } = getState()
  if (ratesInProgress) return

  dispatch({ type: 'exchange_rates_request' })
  return api.loadExchangeRates()
    .then(payload => dispatch({ type: 'exchange_rates_success', payload }))
    .catch(payload => dispatch({ type: 'exchange_rates_failure', payload }))
}
