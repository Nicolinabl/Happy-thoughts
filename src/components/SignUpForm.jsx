import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'

export const SignUpForm = ({ handleLogin }) => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`https://happy-thoughts-api-nicolina.onrender.com/users/signup`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok && response.status >= 500) {
        throw new Error('Failed to create user')
      }

      const resJson = await response.json()

      if (!resJson.success) {
        throw new Error(resJson.message || 'Failed to create user')
      }

      handleLogin(resJson.response)

      navigate('/')

      event.target.reset()

    } catch (error) {
      setError(error.message)
      console.log('error occurred during signup')
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <StyledLink to={`/`}>Return to main page</StyledLink>
      <h1>Sign up</h1>
        <StyledForm onSubmit={handleSubmit}>
          <Fieldset>
            <Label>
              Email
              <Input type="email" onChange={handleChange} name='email' value={formData.email}/>
            </Label>
              Password
              <Input type="password" onChange={handleChange} name="password" value={formData.password} />
              {error && <P>{error}</P>}
            <Button type='submit'>Sign up</Button>
          </Fieldset>
        </StyledForm>
    </>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary-color)
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  width: 60px;
  border-radius: 12px;
  border: none;
  background-color: var(--accent-color);
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2)
  }
`

const Input = styled.input`
  border: none;
  border-radius: 12px;
  padding: 5px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: var(--accent-color);
  }
`

const P = styled.p`
  font-size: 12px;
`

// TODO style signup component