import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  transition: 0.5s ease-in-out;
  position: fixed;
  display: inline-block;
  left: 75px;
  bottom: 51%;
  height: 23px;
  width: 340px;
  transform: translateX(-162px) rotate(-90deg);
  ${props =>
    props.home &&
    css`
      transform: translate(0) rotate(0deg);
      left: 50%;
      margin-left: -170px;
      margin-top: -11.5px;
    `}
`
export const Text = styled.h1`
  text-align: center;
  font-size: 21px;
  margin: 0px;
`
export const Subtitle = styled.p`
  text-align: center;
  margin: 7.5px;
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 22px;
  margin: 0;
`
