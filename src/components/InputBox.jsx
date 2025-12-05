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
    // ... spread operator to create a new array with the existing messages plus the new one
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
  {/* Note to self: key is a special prop in React. it helps React identify which items in a list have changed, been added, or removed */}
  </>
  )
}


