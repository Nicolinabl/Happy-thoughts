import { HeartIcon } from './icons/HeartIcon'
import { Button } from './Button'
import styled from 'styled-components'
import { useState } from 'react'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: pink;
  width: 50vh;
  height: 50vh;
  justify-content: center;

    label {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

const StyledInput = styled.input`
  height: 50px;
`

export const InputBox = () => {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState('')

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(value)
    setValue('')
  }

return (
  <StyledForm onSubmit={handleSubmit}>
    <label> What's making you happy right now?
      <StyledInput 
        type="text"  
        value={value} 
        onChange={handleInput}
      /> 
    </label>

    <Button><HeartIcon></HeartIcon>Send happy thought<HeartIcon></HeartIcon></Button>
    <p>My thought: {submitted}</p>
  </StyledForm>
  )
}