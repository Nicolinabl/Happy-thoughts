import {InputBox} from './InputBox'
import { styled } from 'styled-components'

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

export const PageWrapper = () => {
  return (
    <StyledMain>
      <InputBox />
    </StyledMain>
  )
}