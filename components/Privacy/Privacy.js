import {useState} from 'react'
import { Modal } from '../Modal/Modal'
import { PrivacyText } from './Privacytext'
import classes from './Privacy.module.css'


export const Privacy = ({children, valid, submitted, onChange}) => {
  const [isModalClosed, setModalClosed] = useState(false)
  const cls = [classes.Privacy]
  submitted && !valid && cls.push(classes.NotValid)
  
  function openModalHandler() {
    setModalClosed(true)
  }

  function closeModalHandler(e, valid) {
    onChange({type: "changeInput", item, payload: e.target.value, valid: valid})
    setTimeout( () => setModalClosed(false), 500 )
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
      {isModalClosed && (
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