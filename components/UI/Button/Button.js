import classes from './Button.module.css'


export const Button = ({ value, onClick, submit, valid }) => {
  const cls = [classes.Button]
  submit && !valid && cls.push([classes.Disabled])
  function clickHandler(e) {
    e.preventDefault()
    onClick(e)
  }

  return (
    <button
      disabled={submit && !valid}
      className={ cls.join(' ') }
      onClick={ clickHandler }
      >{value}
    </button>
  )
}