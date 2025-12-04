import {InputBox} from './InputBox'
import { styled } from 'styled-components'

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
`

export const PageWrapper = () => {
  return (
    <StyledMain>
      <InputBox />
    </StyledMain>
  )
}