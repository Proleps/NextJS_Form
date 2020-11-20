import { ErrorCapture } from '../../ErrorCapture/ErrorCapture'
import classes from './Radio.module.css'

export const Radio = ({ state, submit, title, valid, children } ) => {
  
  return (
    <div className={ classes.Radio } >
      <h2 className={ classes.Title } >

        <div>
          {title}

          {submit && !valid &&
            <ErrorCapture message={state.message} />
          }
        </div>
        
      </h2>
      

      <div className={ classes.RadioGender } >
        {children}
      </div>
    </div>
  )
}