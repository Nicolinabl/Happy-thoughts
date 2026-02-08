import { PageWrapper } from './components/PageWrapper.jsx'
import GlobalStyle from './components/styles/GlobalStyles.jsx'
import { InputBox } from './components/InputBox.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginForm } from './components/LoginForm.jsx'
import { SignUpForm } from './components/SignUpForm.jsx'
import { useState, useEffect } from 'react'


export const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    console.log('Logged in user:', userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    // fetchMessages()

    const userFromStorage = localStorage.getItem('user')

    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage))
    }
  }, [])


  return (
    <>  
      <GlobalStyle />
      <PageWrapper>
        <BrowserRouter>

          {user && <p>Welcome, {user.email}</p>}

          <Routes>
            <Route path='/' element={<InputBox user={user} onLogout={handleLogout}/>}></Route>
            <Route path='/login' element={<LoginForm handleLogin={handleLogin}/>}></Route>
            <Route path='/signup' element={<SignUpForm handleLogin={handleLogin}/>}></Route>
          </Routes>
        </BrowserRouter>
      </PageWrapper>
    </>
  )
}


