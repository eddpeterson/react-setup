export const loadExchangeRates = () => {
  return fetch('https://api.exchangeratesapi.io/latest').then(r => r.json())
}
