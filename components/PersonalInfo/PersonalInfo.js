import { useMemo } from 'react'
import classes from './PersonalInfo.module.css'

export const PersonalInfo = ({ state, renderChildren, submit, flag, valid, title, onChange, fileInput } ) => {
  const children = useMemo( () => renderChildren(state, submit, flag, valid, onChange), [flag] )
  
  return (
    <div className={ classes.PersonalInfo } >

      <h2 className={ classes.Title } >
        <div>{title}</div>
      </h2>

      <div>
        {children}
        {fileInput}
      </div>
    </div>
  )
}