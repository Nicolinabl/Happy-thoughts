import { HeartIcon } from './icons/HeartIcon'
import { Button } from './Button'

export const InputBox = () => {
return (
  <form>
    <label> What's making you happy right now?
      <input type="text" /> 
    </label>
    <Button><HeartIcon></HeartIcon>Send happy thought<HeartIcon></HeartIcon></Button>
  </form>
  )
}