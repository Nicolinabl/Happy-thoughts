import styled from 'styled-components'
import { Button } from './Button'
import { HeartIcon } from './icons/HeartIcon'
import React from 'react'
import { useState } from 'react';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--main-bg-color);
  width: 90%;          /* same responsive width as InputBox */
  max-width: 600px;    /* same max-width */
  min-height: 190px;
  justify-content: center;
  margin: 32px auto 0 auto; /* centers horizontally */
  border: 1px solid black;
  padding: 20px;
  box-shadow: 10px 10px black;

`
const StyledParagraph = styled.p`
  font-family: 'Karla', sans-serif;
  color: #8B8B8B;
  margin-left: 10px;
  padding-top: 10px;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  ` 

const StyledBottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  `

// const StyledCounter = styled.div`
//   display: flex;
// `

export const OutputBox = ({children, id, hearts}) => {
  const [count, setCount] = useState(hearts)
  const [clicked, setClicked] = useState(false)

  const postLike = () => {
    fetch(`https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`, {
      method: 'POST',
      // body: JSON.stringify({hearts: count + 1}),
      headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(json => {
      setCount(json.hearts)
    })
  }

  const handleClick = () => {
    postLike()
    setClicked(true)
  }

  return (
    <StyledDiv>
        <p>{children}</p>

      <BottomRow>
        <ButtonContainer>
          <Button 
            cta={clicked}
            onClick={handleClick}>
            <HeartIcon />
          </Button>
        </ButtonContainer>


        <StyledBottomDiv>
          <StyledParagraph>x {count}</StyledParagraph>
          <StyledParagraph>10 seconds ago</StyledParagraph>
        </StyledBottomDiv>
      </BottomRow>
    </StyledDiv>
  )
}