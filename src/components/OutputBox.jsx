import styled from 'styled-components'

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
background-color: #F2F0F0;
width: 500px;
height: 210px;
justify-content: center;
margin: 32px 0;
`

export const OutputBox = ({children}) => {
  return (
    <StyledDiv>
      <p>{children}</p>
    </StyledDiv>
  )
}