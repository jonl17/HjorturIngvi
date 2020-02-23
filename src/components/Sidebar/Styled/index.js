import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 75px 21px 75px;
  z-index: 8;
`
export const Text = styled.p`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 100%;
  padding-top: 2em;
  .selected > span {
    width: 100% !important;
  }
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: 0.2s ease-in-out;
  &&:hover {
    opacity: 0.7;
  }
`
export const Underline = styled.span`
  height: 100%;
  width: 0%;
  border-bottom: 1px solid;
  position: absolute;
  bottom: -15px;
  transition: 0.2s ease-in-out;
  pointer-events: none;
`
export const Button = styled.span`
  margin: 0;
  &&:hover {
    cursor: pointer;
  }
`
export const Lang = styled.span`
  opacity: 0.6;
  ${props =>
    props.selected &&
    css`
      opacity: 1;
    `};
`
