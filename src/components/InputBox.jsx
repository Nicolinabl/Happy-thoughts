import { HeartIcon } from './icons/HeartIcon'
import { Button } from './Button'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { OutputBox  } from './OutputBox'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  width: 90%;     
  max-width: 600px;   
  min-height: 210px;
  justify-content: center;
  margin: 32px auto 0 auto; 
  border: 1px solid black;
  padding: 20px 20px 0 20px;
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
      setErrorMessage('Message must be between 5 and 140 characters long')
    } else {
      setErrorMessage('')
    }
    setValue(e.target.value)
  }

  // when submitting: post thought to API
  const handleSubmit = (e) => {
    e.preventDefault()

    if (value.length < 5 || value.length > 140) {
      setErrorMessage('Message must be between 5 and 140 characters long!')
      return
    }

    fetch('https://happy-thoughts-api-nicolina.onrender.com/messages', {
      method: 'POST',
      body: JSON.stringify({message: value}),
      headers: { 'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(newPost => {

      setPosted((posted) => [newPost, ...posted])
    })

    setValue('')
    setErrorMessage('')
  }

useEffect(() => {
    const fetchMessages = () => {
      fetch('https://happy-thoughts-api-nicolina.onrender.com/messages')
        .then((response) => response.json())
        .then((data) => {
          setPosted(data)

          console.log(data)

        })
    }

    fetchMessages()

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
      {errorMessage && <p style={{color: 'red', fontSize: '16px', marginBottom: '0'}}>{errorMessage}</p>}
    </label>

    <Button 
      style={{backgroundColor: 'var(--accent-color)'}}
      disabled={value.length < 5 || value.length > 140}
      >
        <HeartIcon/>Send happy thought<HeartIcon/>
    </Button>

  </StyledForm>

  {posted.map((post) => {
    return <OutputBox id={post._id} hearts={post.hearts} key={post._id} timeAgo={post.createdAt}>{post.message}</OutputBox>
          })}

  </>
  ) 
}



