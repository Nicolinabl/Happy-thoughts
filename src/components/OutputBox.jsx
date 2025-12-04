import styled from 'styled-components'
import { Button } from './Button'
import { HeartIcon } from './icons/HeartIcon'
import React from 'react'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F2F0F0;
  width: 100%;  
  max-width: 600px;
  min-height: 210px;
  justify-content: center;
  margin: 32px 0;
  border: 1px solid black;
  padding: 20px;
  box-shadow: 10px 10px black;
`

export const OutputBox = ({children}) => {
  const [count, setCount] = React.useState(0)

  const incrementCount = () => {
    setCount(count + 1);
  }

  return (
    <StyledDiv>
      <p>{children}</p>
      <Button onClick={incrementCount}><HeartIcon></HeartIcon></Button>
      <p>x {count}</p>
    </StyledDiv>
  )
}