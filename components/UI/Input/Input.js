import {useReducer} from 'react'
import { ErrorCapture } from '../../ErrorCapture/ErrorCapture';
import classes from './Input.module.css'


function reducer(state, action) {
  switch (action.type) {
    case 'onChange':
      return {...state, value: action.payload}
    case 'isValid':
      return {...state, valid: action.payload};
    default:
      throw new Error();
  }
}


export const Input = ( {state, submitted, valid, onChange, item, checked, classFromFile, children} ) => {
  const initialState = {
    value: state.value,
    valid: state.valid
  }
  const [store, dispatch] = useReducer(reducer, initialState)

  const { type = "text", required = false, placeholder, label, name, message } = state

  const cls = classFromFile?classFromFile:(type === "checkbox" || type === "radio")?[classes.Radio]:[classes.Input]

  required && submitted && !valid && !store.valid && cls.push([classes.InValid])

  const checkedHandler = (type === "radio")?(checked === store.value):(type === "checkbox")?(store.valid):null
  
  const pattern = (type==='text')?'^[A-Za-z]+$|^[А-Яа-яЁё]+$':null
  
  function onChangeHandler(e) {
    if (e.target.files?.length ) {
      if (e.target.files.length > 1) {
        dispatch({type: 'onChange', payload: e.target.files.length})
        required && dispatch({type: 'isValid', payload: e.target.validity.valid})
        onChange({type: item, payload: `Вы выбрали ${e.target.files.length} файла`, valid: e.target.validity.valid})
      } else {
        dispatch({type: 'onChange', payload: e.target.files[0].name})
        required && dispatch({type: 'isValid', payload: e.target.validity.valid})
        onChange({type: item, payload: e.target.files[0].name, valid: e.target.validity.valid})
      }
    } else {
    dispatch({type: 'onChange', payload: e.target.value})
    required && dispatch({type: 'isValid', payload: e.target.validity.valid})    
    onChange({type: item, payload: e.target.value, valid: e.target.validity.valid})
    }
  }
  
  return (
    <label className={cls.join(' ')}>
      <div>
        {children || label}
      </div>


      {(type !='file') ? (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={store.value}
          required={required}
          pattern={pattern}
          onChange={ onChangeHandler }
          defaultChecked={checkedHandler}
        />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            multiple={true}
            onChange={ onChangeHandler }
            defaultChecked={checkedHandler}
          />
        )
      }

      {required && (type === 'text' || type === 'email') && !store.valid && submitted && (
        <ErrorCapture message={message} />
      )}
    </label>
  )
}