import {useState} from 'react'
import { Modal } from '../Modal/Modal'
import { PrivacyText } from './Privacytext'
import classes from './Privacy.module.css'


export const Privacy = ({children, valid, submitted, onChange}) => {
  const [flag, setFlag] = useState(false)
  const cls = [classes.Privacy]
  submitted && !valid && cls.push(classes.NotValid)

  function openModalHandler() {
    setFlag(true)
  }

  function closeModalHandler(e, valid) {
    console.log(e);
    onChange({type: "privacyInput", payload: e.target.value, valid: valid})
    setTimeout( () => setFlag(false), 500 )
  }
  
  return (
    <>
      <div className={ cls.join(' ') } >
          {children}
        &nbsp;
        <span
          onClick={ openModalHandler }
          >политикой конфиденциальности
        </span>
      </div>
      {flag && (
        <Modal
          onCloseClick={ closeModalHandler }
          title="Политика конфиденциальности"
          text={<PrivacyText/>}
          buttonText="Я согласен"
          exit={true}
          type="large"
        />
      )}
    </>
  )
}