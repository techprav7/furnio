import React from 'react'
import Location from '../../components/Location'
import Bill from './components/Bill'
import Quality_assurance from '../../components/Quality_assurance'

const CheckOut = () => {
  return (
    <div>
      <Location title="Checkout" />
      <Bill/>
      <Quality_assurance/>
    </div>
  )
}

export default CheckOut