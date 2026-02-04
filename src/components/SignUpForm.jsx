import { Link } from 'react-router-dom'
import { useState } from 'react'

export const SignUpForm = ({ handleLogin }) => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

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
    <Link to={`/`}>Return to main page</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" placeholder="Email" onChange={handleChange} name='email' value={formData.email}/>
        </label>
        <input type="password" placeholder="Password" onChange={handleChange} name="password" value={formData.password} />
        <button type='submit'>Sign up and log in</button>

        {error && <p>{error}</p>}
      </form>
    </>
  )
}