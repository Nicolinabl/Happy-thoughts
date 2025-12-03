import { createGlobalStyle } from "styled-components" 

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: karla, sans-serif;
    font-size: 50px;
  }
`
export default GlobalStyle