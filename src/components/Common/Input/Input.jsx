import React from 'react';
import './Input.scss'

export const Input = ({input, meta, ...props}) => {
  // console.log(input)
  // console.log(meta)
  // console.log(props)
  const hasError = meta.touched && meta.error
  return (
    <>
      <input className={"formControl"+" "+(hasError? "formControl_error":"")} {...input} {...props}></input>
      {hasError && <span className={"formControl__span_error"}>{meta.error}</span>}
    </>
  )
}