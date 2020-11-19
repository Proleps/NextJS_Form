import React from 'react'
import classes from './ErrorCapture.module.css'

export const ErrorCapture = ({message}) => (
  <span className={ classes.ErCapture } >
    {message}
  </span>
)