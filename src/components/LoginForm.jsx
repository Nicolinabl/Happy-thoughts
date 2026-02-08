import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'

export const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Fill in both fields please")
      return
    }

    setError("")

    try {
      const response = await fetch(`https://happy-thoughts-api-nicolina.onrender.com/users/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Network response not okay")
      }

      const data = await response.json()
      handleLogin(data.response)
      navigate('/')
    } catch (error) {
      setError("Email or password invalid")
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]:value 
    }))
  }

  return (
    <>
    <StyledLink to={`/`}>Return to main page</StyledLink>
    <h1>Log in</h1>
      <StyledForm onSubmit={handleSubmit}>
        <Fieldset>
          <Label>
            Email
            <Input type="email" onChange={handleChange} name="email" value={formData.email} />
          </Label>
          <Label>
            Password
            <Input type="password" name="password" value={formData.password} onChange={handleChange} />
          </Label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit">Log in</Button>
        </Fieldset>
        <Div>
          <p>Not a user? </p>
          <StyledLink to={`/signUp`}>Sign up </StyledLink>
        </Div>
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


// TODO style login component