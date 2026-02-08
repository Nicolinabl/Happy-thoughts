import { HeartIcon } from './icons/HeartIcon'
import { Button } from './Button'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { OutputBox  } from './OutputBox'
import { Link } from 'react-router-dom'

export const InputBox = ({ user, onLogout }) => {
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

    const user = JSON.parse(localStorage.getItem('user'))

    if (value.length < 5 || value.length > 140) {
      setErrorMessage('Message must be between 5 and 140 characters long!')
      return
    }

    fetch('https://happy-thoughts-api-nicolina.onrender.com/messages', {
      method: 'POST',
      body: JSON.stringify({message: value}),
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.accessToken}`
        },
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
  }, [])

const handleDelete = (id) => {
  setPosted(prev => prev.filter(post => post._id !==id))
}

const handleEdit = async (id, newMessage) => {
  const user = JSON.parse(localStorage.getItem("user"))

  const response = await fetch(
    `https://happy-thoughts-api-nicolina.onrender.com/messages/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify({ message: newMessage }),
    }
  )

  const updatedMessage = await response.json()

  setPosted((prev) =>
    prev.map((post) =>
      post._id === id ? updatedMessage : post
    )
  )
}

return (
  <>
  <Div>
    <StyledLink to ={`/login`}><Button>Log in</Button></StyledLink>
    <Button onClick={onLogout}>Log out</Button>
  </Div>

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
    return <OutputBox 
    id={post._id} 
    hearts={post.hearts} 
    key={post._id} 
    timeAgo={post.createdAt} 
    onDelete={handleDelete} 
    onEdit={handleEdit}>
      {post.message}
      </OutputBox>
          })}
  </>
  ) 
}

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

const Div = styled.div`
  display: flex;
  width: 90%;     
  max-width: 600px; 
  justify-content: center;
  gap: 40px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

// TODO edit error message styling when not being able to post logged out
