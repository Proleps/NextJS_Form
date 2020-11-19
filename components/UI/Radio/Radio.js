import { useState, useMemo } from 'react'
import { ErrorCapture } from '../../ErrorCapture/ErrorCapture'
import classes from './Radio.module.css'

export const Radio = ({ state, renderChildren, submit, onChange, flag, title } ) => {
  const [valid, setValid] = useState(state.valid)
  
  const children = useMemo( () => renderChildren(state, submit, onChangeHandler), [flag, submit] )

  function onChangeHandler(news) {
    state.required && setValid(true)
    onChange({...news, type: 'radioInput'})
  }

  return (
    <div className={ classes.Radio } >
      <h2 className={ classes.Title } >

        <div>{title}</div>
        
        {submit && !valid &&
          <ErrorCapture message={state.message} />
        }
      </h2>
      

      <div className={ classes.RadioGender } >
        {children}
      </div>
    </div>
  )
}