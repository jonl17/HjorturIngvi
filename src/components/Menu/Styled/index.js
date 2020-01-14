import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  box-sizing: border-box;
  padding: 150px;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: lightgray;
  z-index: 4;
  opacity: 1;
  pointer-events: all;
  transition: 0.2s ease-in-out;
  ${props =>
    props.status === "closed" &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: black;
  &&:hover {
    color: white;
  }
`
export const Item = styled.p`
  font-size: 70px;
  text-transform: uppercase;
  display: inline-block;
  margin: 0;
`
