import { createGlobalStyle } from "styled-components" 

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: var(--main-bg-color);
    margin: 0 auto;
    font-family: 'Karla', sans-serif;
    font-size: 20px;
  }

  :root {
    --main-bg-color: #FFFFFF;
    --main-text-color: #000000;
    --primary-color: #F2F0F0;
    --secondary-color: #EAEAEA;
    --accent-color: #FFA9AB;
  }
`
export default GlobalStyle
