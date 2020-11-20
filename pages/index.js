import Head from 'next/head'
import { useMemo, useReducer } from 'react'
import { Button } from '../components/UI/Button/Button'
import { FileInput } from '../components/FileInput/FileInput'
import { Input } from '../components/UI/Input/Input'
import { Modal } from '../components/Modal/Modal'
import { Privacy } from '../components/Privacy/Privacy'
import { Radio } from '../components/UI/Radio/Radio'
import classes from '../styles/Form.module.css'

const initialState = {
  validity: {
    valid: false,
    submitted: false
  },
  inputs: {
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
      value: "",
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
}

function reducer(state, action) {
  switch (action.type) {
    case "changeInput":
      return {
        ...state, inputs: {
          ...state.inputs, [action.item]: {
            ...state.inputs[action.item], value: action.payload, valid: action.valid } } }
    case "changeSubmitted":
      return {...state, validity: {...state.validity, submitted: action.payload}}
    case "isValid":
      return {...state, validity: {...state.validity, valid: action.payload}}
    case "__INIT__":
      return initialState
    default:
      throw new Error();
  }
}

export default function Form() {
  const [store, dispatch] = useReducer(reducer, initialState)

  function isFormValid(newStore) {
    let isValid = true
    for (let i in store.inputs) {
      if(store.inputs[i].required)
        if( i === newStore?.item ) {
          isValid = isValid && newStore.valid
        } else isValid = isValid && store.inputs[i].valid
    }
    dispatch({type: "isValid", payload: isValid})
    isValid && dispatch({type: "changeSubmitted", payload: false})
  }

  function onInputChangeHandler(newStore) {
    dispatch(newStore)
    isFormValid(newStore)
  }

  function clickSubmitHandler() {
    isFormValid()
    dispatch({type: "changeSubmitted", payload: true})
  }

  function closeModalHandler() {
    setTimeout( () => dispatch({type: "__INIT__"}), 500)
  }

  return (
    <div className={classes.App}>
      <Head>
        <title>Test | Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={ classes.Form } >

          <h1>Анкета соискателя</h1>

          <div className={ classes.PersonalInfo } >
            <h2 className={ classes.Title } >
              <div>Личные данные</div>
            </h2>
            <div>
              <Input
                state={store.inputs.firstName}
                flag={store.validity.valid}
                item="firstName"
                valid={store.validity.valid}
                submitted={store.validity.submitted}
                onChange={onInputChangeHandler}
                needOwnErrCapture={true}
              />
              <Input
                state={store.inputs.lastName}
                flag={store.validity.valid}
                item="lastName"
                valid={store.validity.valid}
                submitted={store.validity.submitted}
                onChange={onInputChangeHandler}
                needOwnErrCapture={true}
              />
              <Input
                state={store.inputs.email}
                flag={store.validity.valid}
                item="email"
                valid={store.validity.valid}
                submitted={store.validity.submitted}
                onChange={onInputChangeHandler}
                needOwnErrCapture={true}
              />
              <FileInput
                state={store.inputs.fileInput}
                item="fileInput"
                onChange={onInputChangeHandler}
                submitted={store.validity.submitted}
              />
            </div>
          </div>

          <Radio
            state={store.inputs.radioInput}
            submit={store.validity.submitted}
            valid={store.inputs.radioInput.valid}
            title="Пол *"
          > <Input
              state={store.inputs.radioInput.genderMan}
              item="radioInput"
              valid={store.validity.valid}
              checked={(store.inputs.radioInput.value === store.inputs.radioInput.genderMan.value)}
              submitted={store.validity.submitted}
              onChange={onInputChangeHandler}
              needOwnErrCapture={false}
            />
            <Input
              state={store.inputs.radioInput.genderWoman}
              item="radioInput"
              valid={store.validity.valid}
              checked={(store.inputs.radioInput.value === store.inputs.radioInput.genderWoman.value)}
              submitted={store.validity.submitted}
              onChange={onInputChangeHandler}
              needOwnErrCapture={false}
            />
          </Radio>

          <h2>Github</h2>
          <Input
            state={store.inputs.github}
            onChange={onInputChangeHandler}
            item="github"
            submitted={store.validity.submitted}
            needOwnErrCapture={true}
          />
          
          <Privacy
            valid={store.inputs.privacyInput.valid} 
            submitted={store.validity.submitted}
            onChange={onInputChangeHandler}
          > <Input
              state={store.inputs.privacyInput}
              item="privacyInput"
              submitted={store.validity.submitted}
              onChange={onInputChangeHandler}
              checked={store.inputs.privacyInput.valid}
            />
          </Privacy>

          <Button
            value="Отправить"
            submit={store.validity.submitted}
            valid={store.validity.valid}
            onClick={ clickSubmitHandler }
          />

          {store.validity.valid && store.validity.submitted &&
            <Modal
              onCloseClick={ closeModalHandler }
              title={`Спасибо ${store.inputs.firstName.value}!`}
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