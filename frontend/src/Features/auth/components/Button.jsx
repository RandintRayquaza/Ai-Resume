import React from 'react'
import '../style/button.scss'
const Button = ({children}) => {
  return (
    <button className='btn btn-primary'>{children}</button>
  )
}

export default Button