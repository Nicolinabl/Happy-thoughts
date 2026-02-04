import { Link } from 'react-router-dom'
import { useState } from 'react'

export const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

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
      <Link to={`/`}>Return to main page</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" placeholder="Email" onChange={handleChange} name="email" value={formData.email} />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
        <p>Not a user? </p><Link to={`/signUp`}>Sign up </Link>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}