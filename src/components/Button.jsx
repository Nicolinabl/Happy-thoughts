import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.cta ? '#FFA9AB' : '#EAEAEA'};
  border-radius: 50px;
  width: fit-content;
  border: none;
  padding: 5px 15px;
  margin: 15px 0; 
  gap: 10px;

  &:hover {
  cursor: pointer;
  transform: scale(1.05);
  background-color: #FFA9AB;
  }
`

export const Button = ({children, onClick, cta}) => {
  return (
    <StyledButton 
      type="submit"
      onClick={onClick}
      $cta={cta}
    >
      {children}
    </StyledButton>
  )
}