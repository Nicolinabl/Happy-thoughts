import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #FFA9AB;
  border-radius: 50px;
  width: fit-content;
  border: none;
  padding: 5px 15px;
  margin: 15px 0; 

  &:hover {
  cursor: pointer;
  transform: scale(1.05);
  }
`

export const Button = ({children, onClick}) => {
  return (
    <StyledButton 
    type="submit"
    onClick={onClick}
    >{children}</StyledButton>
  )
}