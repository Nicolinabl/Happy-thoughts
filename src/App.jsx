import { PageWrapper } from './components/PageWrapper.jsx'
import GlobalStyle from './components/styles/GlobalStyles.jsx'
import { InputBox } from './components/InputBox.jsx'

export const App = () => {
  return (
    <>  
      <GlobalStyle />
      <PageWrapper>
        <InputBox />
        {/* OutputBox here */}
      </PageWrapper>
    </>
  )
}


