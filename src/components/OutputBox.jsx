import styled from 'styled-components'
import { Button } from './Button'
import { HeartIcon } from './icons/HeartIcon'
import React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'

export const OutputBox = ({children, id, hearts, timeAgo, onDelete}) => {
  const [count, setCount] = useState(hearts)
  const [clicked, setClicked] = useState(false)
  // const [timeSincePost, setTimeSincePost] = useState(moment(timeAgo).fromNow())
  const [now, setNow] = useState(Date.now()) 

  const postLike = () => {
    fetch(`https://happy-thoughts-api-nicolina.onrender.com/messages/${id}/like`, {
      method: 'PATCH',
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

  const deleteTask = () => {
    fetch(`https://happy-thoughts-api-nicolina.onrender.com/messages/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        onDelete(id)
      })
  }

  // const updateMessage = () => {

  // }

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 30000)
    return () => clearInterval(interval)
  }, [timeAgo])

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
          <StyledSpan>
            <StyledParagraph>Posted {moment(timeAgo).from(now)}</StyledParagraph>
            <StyledButton onClick={deleteTask}><DeleteIcon /></StyledButton>
            <StyledButton><EditIcon /></StyledButton>
          </StyledSpan>
        </StyledBottomDiv>
      </BottomRow>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--main-bg-color);
  width: 90%;
  max-width: 600px;
  min-height: 190px;
  justify-content: center;
  margin: 32px auto 0 auto; 
  border: 1px solid black;
  padding: 20px;
  box-shadow: 10px 10px black;

`
const StyledParagraph = styled.p`
  font-family: 'Karla', sans-serif;
  color: #8B8B8B;
  margin-left: 10px;
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
const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`

const StyledSpan = styled.span`
  display: flex;
`