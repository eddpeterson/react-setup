import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../src/actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const response = {
    ok: true,
    body: [],
    headers: { 'content-type': 'application/json' },
  }

  describe('loadExchangeRates', () => {
    it('success', async () => {
      const body = {
        base: 'EUR',
        date: '2018-11-20',
        rates: [
          { AUD: 1.5712 },
          { BGN: 1.9558 },
          { BRL: 4.2919 },
        ],
      }
      const expected = [
        { type: 'exchange_rates_request' },
        { type: 'exchange_rates_success', payload: body },
      ]
      fetchMock.getOnce(
        'https://api.exchangeratesapi.io/latest',
        body,
      )
      const store = mockStore({})
      await store.dispatch(actions.loadExchangeRates())
      expect(store.getActions()).toEqual(expected)
    })

    it('failure', async () => {
      const expected = [
        { type: 'exchange_rates_request' },
        { type: 'exchange_rates_failure', payload: Error('Failing graciously') },
      ]
      fetchMock.getOnce(
        'https://api.exchangeratesapi.io/latest',
        { ...response, throws: Error('Failing graciously') },
      )
      const store = mockStore({})
      await store.dispatch(actions.loadExchangeRates())
      expect(store.getActions()).toEqual(expected)
    })

    it('wait for request to finish', async () => {
      const expected = []
      const store = mockStore({
        ratesInProgress: true,
      })
      await store.dispatch(actions.loadExchangeRates())
      expect(store.getActions()).toEqual(expected)
    })
  })
})
