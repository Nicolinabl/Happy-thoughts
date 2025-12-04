import { HeartIcon } from './icons/HeartIcon'
import { Button } from './Button'
import styled from 'styled-components'
import { useState } from 'react'
import { OutputBox  } from './OutputBox'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #F2F0F0;
  width: 100%;  
  max-width: 600px;
  min-height: 210px;
  justify-content: center;
  margin-top: 32px;
  border: 1px solid black;
  padding: 20px;
  box-shadow: 10px 10px black;

  label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  }
`
const StyledInput = styled.input`
  display: flex;
  height: 50px;
  font-size: 20px;
  font-family: 'Karla', sans-serif;
`

export const InputBox = () => {
  const [value, setValue] = useState('')
  const [posted, setPosted] = useState([])

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPosted([...posted, value])
    setValue('')
  }

return (
  <>
  <StyledForm onSubmit={handleSubmit}>
    <label> What's making you happy right now?
      <StyledInput 
        type="text"  
        value={value} 
        onChange={handleInput}
      /> 
    </label>

    <Button><HeartIcon></HeartIcon>Send happy thought<HeartIcon></HeartIcon></Button>
  </StyledForm>

  {posted.map((message, index) => (
    <OutputBox key={index}>{message}</OutputBox>
  ))} 
  </>
  )
}

// chain of events:
// 1. When input is changed, handleInput is called
// 2. when handelInput is called, it updates the value state with setValue
// 3. when the form is submitted, handleSubmit is called
// 4. when handleSubmit is called, it prevents the default form submission behavior, adds the current value to the posted array using setPosted, and resets the value state to an empty string
// 5. The component re-renders, displaying the updated list of posted messages below the form
// 6. Each message in the posted array is rendered inside an OutputBox component
