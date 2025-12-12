import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.$cta ? 'var(--accent-color)' : 'var(--secondary-color)'};
  border-radius: 50px;
  width: fit-content;
  border: none;
  padding: 10px 10px;
  margin: 20px 0 0 0;; 
  gap: 10px;

  &:hover {
  cursor: pointer;
  transform: scale(1.05);
  background-color: var(--accent-color);
  }
`

export const Button = ({children, onClick, cta, style}) => {
  return (
    <StyledButton 
      type="submit"
      onClick={onClick}
      $cta={cta}
      style={style}
    >
      {children}
    </StyledButton>
  )
}