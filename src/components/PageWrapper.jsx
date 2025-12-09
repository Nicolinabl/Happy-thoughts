import { styled } from 'styled-components'

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

export const PageWrapper = ({children}) => {
  return (
    <StyledMain>{children}</StyledMain>
  )
}