import styled, { css } from "styled-components"

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
