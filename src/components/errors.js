import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import style from '../assets/css/errors.css'
import mp from '../assets/css/shared/margins_paddings.css'

const Item = ({ message }) => (<div key={message}>{message}</div>)
const Errors = ({ errors }) => {
  if (_.isEmpty(errors)) return null
  const items = Object.values(errors).map(p => <Item message={p.message} />)
  return (
    <div className={`${style.container} ${mp.padding}`}>
      <div>{items}</div>
    </div>
  )
}
const mapState = ({ errors }) => ({ errors })
export default connect(mapState)(Errors)
