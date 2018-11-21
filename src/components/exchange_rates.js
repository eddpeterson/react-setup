import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import style from '../assets/css/exchange_rates.css'

const Item = ([currency, amount]) => (
  <div key={currency} className={style.item}>
    <div className={style.currency}>{currency}</div>
    <div>{amount}</div>
  </div>
)

const Empty = () => (
  <div className={style.empty}>
    No exchange rates loaded
  </div>
)

const ExchangeRates = ({ data }) => {
  if (_.isEmpty(data)) return (<Empty />)
  const { base, date, rates } = data
  const items = rates.map(Item)
  return (
    <div className={style.container}>
      <div className={style.info}>{`1 ${base} rate on ${date}`}</div>
      <div className={style.items}>
        {items}
      </div>
    </div>
  )
}

const mapState = ({ rates }) => ({ data: rates })
export default connect(mapState)(ExchangeRates)
