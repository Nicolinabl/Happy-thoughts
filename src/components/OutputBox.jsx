import styled from 'styled-components'
import { Button } from './Button'
import { HeartIcon } from './icons/HeartIcon'
import React from 'react'
import { useState } from 'react';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F2F0F0;
  width: 100%;  
  max-width: 600px;
  min-height: 190px;
  justify-content: center;
  margin: 32px 0;
  border: 1px solid black;
  padding: 20px;
  box-shadow: 10px 10px black;
`
const StyledParagraph = styled.p`
  font-family: 'Karla', sans-serif;
  color: #8B8B8B;
  margin-left: 10px;
`

const StyledCounter = styled.div`
  display: flex;
`

export const OutputBox = ({children}) => {
  const [count, setCount] = useState(0)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setCount(count + 1)
    setClicked(true)
  }

  return (
    <StyledDiv>
      <div>
        <p>{children}</p>
      </div>

      <StyledCounter>
        <Button 
          cta={clicked}
          onClick={handleClick}
        ><HeartIcon></HeartIcon></Button>
        <StyledParagraph>x {count}</StyledParagraph>
      </StyledCounter>
    </StyledDiv>
  )
}