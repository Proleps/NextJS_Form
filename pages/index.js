import Head from 'next/head'
import { useMemo, useState } from 'react'
import { Button } from '../components/UI/Button/Button'
import { FileInput } from '../components/FileInput/FileInput'
import { Input } from '../components/UI/Input/Input'
import { Modal } from '../components/Modal/Modal'
import { Privacy } from '../components/Privacy/Privacy'
import { Radio } from '../components/UI/Radio/Radio'
import classes from '../styles/Form.module.css'
import { PersonalInfo } from '../components/PersonalInfo/PersonalInfo'

const initialState = {
  firstName: {
    type: "text",
    required: true,
    placeholder: "Имя",
    label: "Имя *",
    message: "В имени могут быть только буквы",
    value: "",
    valid: false
  },
  lastName: {
    type: "text",
    required: true,
    placeholder: "Фамилия",
    label: "Фамилия *",
    message: "В Фамилии могут быть только буквы",
    value: "",
    valid: false
  },
  email: {
    type: "email",
    required: true,
    placeholder: "Электронная почта",
    label: "Электронная почта *",
    message: "Пожалуйста укажите электронную почту",
    value: "",
    valid: false
  },
  github: {
    type: "url",
    required: false,
    placeholder: "Вставьте ссылку на Github",
    label: "Вставьте ссылку на Github",
    message: "Проверьте правильность ссылки",
    value: "",
    valid: true
  },
  privacyInput: {
    type: "checkbox",
    required: true,
    label: "* Я согласен с",
    message: "В имени могут быть только буквы",
    value: true,
    valid: false
  },
  fileInput: {
    type: "file",
    required: false,
    multiple: true,
    message: "Выберите файл заново",
    value: "",
    valid: true
  },
  radioInput: {
    controls: ['genderMan', 'genderWoman'],
    value: "",
    valid: false,
    required: true,
    message: "укажите пол",
    genderMan: {
      type: "radio",
      name: "gender",
      message: "укажите пол",
      value: "genderMan",
      label: "Мужской",
      valid: false
    },
    genderWoman: {
      type: "radio",
      name: "gender",
      message: "укажите пол",
      value: "genderWoman",
      label: "Женский",
      valid: false
    }
  }
}

let currentState = JSON.parse(JSON.stringify(initialState))

function renderInputs(state, submitted, flag, valid, onChange) {
  const acc = []
  Object.keys(state).map( (item, i) => 
    acc.push(
      <Input
        key={i-Math.random()}
        state={state[item]}
        flag={flag}
        item={item}
        valid={valid}
        submitted={submitted}
        onChange={onChange}
      />
    )
  )
  return acc
}

function renderRadio(state, submitted, onChange) {
  const acc = []
  state.controls.map((item, i) => 
    acc.push(
      <Input
        key={i+state.value}
        state={state[item]}
        item={[item]}
        valid={state.valid}
        checked={state.value}
        submitted={submitted}
        onChange={onChange}
      />
    )
  )
  return acc
}

export default function Form() {
  const [formState, setFormState] = useState({submitted: false, valid: false, flag: false})

  function isFormValid(click) {
    let isValid = true
    for (let i in currentState) {
      isValid = currentState[i].required?(isValid && currentState[i].valid):isValid
    } 
    if (!click) {
      if(isValid) {
        setFormState({...formState, submitted: false, valid: true})
      } else {
        setFormState({...formState, valid: false})
      }
    }
    
    return isValid
  }

  function onInputChangeHandler({type, payload, valid}) {

    currentState[type] = {...currentState[type], value: payload, valid: valid }
    isFormValid()
  }

  function onRadioChangeHandler({payload, valid}) {

    currentState.radioInput = {...currentState.radioInput, value: payload, valid: valid }
    isFormValid()
  }

  function clickSubmitHandler() {
    setFormState({...formState, submitted: true, valid: isFormValid(true), flag: true})
  }

  function closeModalHandler() {
    currentState = JSON.parse(JSON.stringify(initialState))
    setTimeout( () => setFormState({...formState, submitted: false, valid: false, flag: !formState.flag}, 500 ) )
  }

  const fileInput = useMemo( () => (
    <FileInput
      key={currentState.fileInput.value}
      state={currentState.fileInput}
      item="fileInput"
      onChange={onInputChangeHandler}
      submit={formState.submitted}
    />
    ), [formState.flag, currentState.fileInput.value, formState.submitted] )

  const githubInput = useMemo( () => (
    <Input
      key={Math.random()}
      state={currentState.github}
      onChange={onInputChangeHandler}
      item="github"
      submitted={formState.submitted}
    />
  ), [formState.flag] ) 

  return (
    <div className={classes.App}>
      <Head>
        <title>Test | Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={ classes.Form } >

          <h1>Анкета соискателя</h1>

          <PersonalInfo
            state={{firstName: {...currentState.firstName}, lastName: {...currentState.lastName}, email: {...currentState.email}}}
            renderChildren={renderInputs}
            flag={formState.flag}
            submit={formState.submitted}
            valid={formState.valid}
            onChange={onInputChangeHandler}
            title="Личные данные"
            fileInput={fileInput}
          />

          <Radio
            state={currentState.radioInput}
            renderChildren={renderRadio}
            submit={formState.submitted}
            flag={formState.flag}
            onChange={onRadioChangeHandler}
            title="Пол *"
          />

          <h2>Github</h2>
          {githubInput}
          
          <Privacy
            valid={currentState.privacyInput.valid} 
            submitted={formState.submitted}
            onChange={onInputChangeHandler}
          > <Input
              key={Math.random()}
              state={currentState.privacyInput}
              item="privacyInput"
              submitted={formState.submitted && formState.valid}
              onChange={onInputChangeHandler}
            />
          </Privacy>

          <Button
            key={Math.random()}
            value="Отправить"
            submit={formState.submitted}
            valid={formState.valid}
            onClick={ clickSubmitHandler }
          />

          {formState.submitted && formState.valid &&
            <Modal
              onCloseClick={ closeModalHandler }
              title={`Спасибо ${currentState.firstName.value}!`}
              text="Мы скоро свяжемся с вами"
              buttonText="Понятно"
              exit={false}
              type="mini"
            />
          }

      </form>
    </div>
  )
}