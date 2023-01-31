import React, { useState } from 'react'
import classes from "./Counter.module.scss"

export const Counter = () => {
  const [counter, setCounter] = useState(0)
  const increment = () => {
    setCounter(counter + 1)
  }
  return (
    <div>
      {counter}
      <button className={classes.btn}  onClick={increment}>+</button>
    </div>
  )
}
// npm i -D sass@1.49.9 sass-loader@12.6.0 sass-loader@12.6.0 style-loader@3.3.1