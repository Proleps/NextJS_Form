import { ErrorCapture } from '../../ErrorCapture/ErrorCapture';
import classes from './Input.module.css'

export const Input = ( {state, submitted, onChange, item, checked, classFromFile, children, needOwnErrCapture} ) => {
  const { type = "text", required = false, placeholder, label, name, message, valid, value } = state

  const cls = styleHandler()
    function isValidStyle(validStyle, notValidStyle, needErrStyle) {
      if(needErrStyle && submitted && !valid) {
        return [validStyle, notValidStyle]
      } else return [validStyle]
    }
    function styleHandler() {
      switch (type) {
        case "text":
          return isValidStyle(classes.Input, classes.InValid, required)
        case "email":
          return isValidStyle(classes.Input, classes.InValid, required)
        case "url":
          return isValidStyle(classes.Input, classes.InValid, !!value)
        case "radio":
          return isValidStyle(classes.Radio, classes.InValid, required)
        case "checkbox":
          return isValidStyle(classes.Radio, classes.InValid, required)
        case "file":
          return classFromFile
      }
    }

  const pattern = (type==='text')?'^[A-Za-z]+$|^[А-Яа-яЁё]+$':null

  function onChangeHandler(e) {
    if ( type === "file" ) {
      onChange(e)
    } else {
    onChange({type: "changeInput",item, payload: e.target.value, valid: e.target.validity.valid})
    }
  }
  
  return (
    <label className={cls.join(" ")}>
      <div>
        {children || label}
      </div>

      {(type !='file') ? (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          pattern={pattern}
          onChange={ onChangeHandler }
          checked={checked}
        />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            multiple={true}
            onChange={ onChangeHandler }
          />
        )
      }

      { needOwnErrCapture && !valid  && submitted &&  (
        <ErrorCapture message={message} />
      )}
    </label>
  )
}