import { PageWrapper } from './components/PageWrapper.jsx'
import GlobalStyle from './components/styles/GlobalStyles.jsx'
import { InputBox } from './components/InputBox.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginForm } from './components/LoginForm.jsx'
import { SignUpForm } from './components/SignUpForm.jsx'
import { useState } from 'react'


export const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    console.log('Logged in user:', userData)
    // save user to local storage
  }

  return (
    <>  
      <GlobalStyle />
      <PageWrapper>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<InputBox />}></Route>
            <Route path='/login' element={<LoginForm handleLogin={handleLogin}/>}></Route>
            <Route path='/signup' element={<SignUpForm handleLogin={handleLogin}/>}></Route>
          </Routes>
        </BrowserRouter>
      </PageWrapper>
    </>
  )
}


