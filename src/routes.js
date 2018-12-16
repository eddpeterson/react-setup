import * as actions from './actions'

const routesMap = {
  loc_home: '/',
  loc_autoload: {
    thunk: actions.loadExchangeRates(),
    path: '/autoload',
  },
}

export default routesMap
