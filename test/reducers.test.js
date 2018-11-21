import * as reducers from '../src/reducers'

describe('ratesInProgress', () => {
  const nextState = (state, action) => reducers.ratesInProgress(state, action)

  it('initial', () => {
    const state = undefined
    const action = { type: 'unknown' }
    const expected = false
    expect(nextState(state, action)).toEqual(expected)
  })
  it('request', () => {
    const state = undefined
    const action = { type: 'exchange_rates_request' }
    const expected = true
    expect(nextState(state, action)).toEqual(expected)
  })
  it('success', () => {
    const state = true
    const action = { type: 'exchange_rates_success' }
    const expected = false
    expect(nextState(state, action)).toEqual(expected)
  })
  it('failure', () => {
    const state = true
    const action = { type: 'exchange_rates_failure' }
    const expected = false
    expect(nextState(state, action)).toEqual(expected)
  })
})

describe('rates', () => {
  const nextState = (state, action) => reducers.rates(state, action)

  it('initial', () => {
    const state = undefined
    const action = { type: 'unknown' }
    const expected = {}
    expect(nextState(state, action)).toEqual(expected)
  })
  it('success', () => {
    const state = true
    const rates = {
      USD: 1.1409,
      GBP: 0.89108,
    }
    const payload = { rates }
    const action = { type: 'exchange_rates_success', payload }
    const expected = {
      rates: [
        ['GBP', 0.89108],
        ['USD', 1.1409],
      ],
    }
    expect(nextState(state, action)).toEqual(expected)
  })
})

describe('errors', () => {
  const nextState = (state, action) => reducers.errors(state, action)

  it('initial state', () => {
    const state = undefined
    const action = { type: 'unknown' }
    const expected = {}
    expect(nextState(state, action)).toEqual(expected)
  })

  it('failure action', () => {
    const state = undefined
    const action = { type: 'action_name_failure', payload: 'message' }
    const expected = { action_name: 'message' }
    expect(nextState(state, action)).toEqual(expected)
  })

  it('request action', () => {
    const state = { action_name: 'massage' }
    const action = { type: 'action_name_request' }
    const expected = {}
    expect(nextState(state, action)).toEqual(expected)
  })

  it('success action', () => {
    const state = { action_name: 'massage' }
    const action = { type: 'action_name_success' }
    const expected = {}
    expect(nextState(state, action)).toEqual(expected)
  })

  it('wipeout errors on redirect', () => {
    const state = { action_name: 'message' }
    const action = { type: 'redirect' }
    const expected = {}
    expect(nextState(state, action)).toEqual(expected)
  })

  it('handle multiple actions', () => {
    const state = { action_name: 'message', action_name2: 'message' }
    const action = { type: 'action_name_success' }
    const expected = { action_name2: 'message' }
    expect(nextState(state, action)).toEqual(expected)
  })
})
