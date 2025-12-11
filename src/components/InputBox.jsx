import { HeartIcon } from './icons/HeartIcon'
import { Button } from './Button'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
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
  const [errorMessage, setErrorMessage] = useState('')

  const handleInput = (e) => {
    if(e.target.value.length > 140) {
      setErrorMessage('Your message is too long friend! Max 140 characters allowed.')
    } else {
      setErrorMessage('')
    }
    setValue(e.target.value)
  }

  // when submitting: post thought to API
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('https://happy-thoughts-api-4ful.onrender.com/thoughts', {
      method: 'POST',
      body: JSON.stringify({message: value}),
      headers: { 'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(newPost => {

      setPosted((posted) => [newPost, ...posted])
    })

    setValue('')
  }

useEffect(() => {
    const fetchMessages = () => {
      fetch('https://happy-thoughts-api-4ful.onrender.com/thoughts')
        .then((response) => response.json())
        .then((data) => {
          setPosted(data)

          console.log(data)

        })
    }

    fetchMessages()

    // Use interval here to refresh messages and likes every x seconds?

  }, ([]))

return (
  <>
  <StyledForm onSubmit={handleSubmit}>
    <label> What's making you happy right now?
      <StyledInput 
        type="text"  
        value={value} 
        onChange={handleInput}
      /> 
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
    </label>

    <Button><HeartIcon></HeartIcon>Send happy thought<HeartIcon></HeartIcon></Button>
  </StyledForm>

  {posted.map((post) => {
    return <OutputBox id={post._id} hearts={post.hearts} key={post._id}>{post.message}</OutputBox>
          })}

  </>
  ) 
}



