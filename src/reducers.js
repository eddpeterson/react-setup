import { NOT_FOUND } from 'redux-first-router'
import _ from 'lodash'

export const page = (state = 'loc_home', { type }) => {
  switch (type) {
    case 'loc_home':
    case 'loc_autoload':
      return 'ExchangeRates'
    case NOT_FOUND:
      return 'NotFound'
    default:
      return state
  }
}

export const ratesInProgress = (state = false, { type }) => {
  switch (type) {
    case 'exchange_rates_request':
      return true
    case 'exchange_rates_success':
    case 'exchange_rates_failure':
      return false
    default:
      return state
  }
}

export const rates = (state = {}, { type, payload }) => {
  switch (type) {
    case 'exchange_rates_success':
      const { rates, ...rest } = payload
      const sorted = Object
        .keys(rates)
        .sort()
        .reduce((acc, curr) => ([...acc, [curr, rates[curr]]]), [])
      return { ...rest, rates: sorted }
    default:
      return state
  }
}

// Handle errors for all actions ending with:
// _request, _success, _failure
// On every redirect wipeout error messages.
export const errors = (state = {}, { type, payload }) => {
  if (type === 'redirect') return {}

  const pattern = /_([^_]*)$/
  const match = type.match(pattern, '')
  // get 'request' from 'action_name_request'
  const status = (match) ? match[1] : undefined
  // get 'action_name' from 'action_name_request'
  const name = type.replace(pattern, '')

  switch (status) {
    case 'request':
    case 'success':
      return _.omit(state, [name])
    case 'failure':
      return { ...state, [name]: payload }
    default:
      return state
  }
}
