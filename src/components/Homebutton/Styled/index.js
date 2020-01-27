import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  transition: 0.2s ease-in-out;
  position: absolute;
  display: inline-block;
  left: 75px;
  bottom: 55%;
  height: 23px;
  width: 214px;
  transform: translateX(-105px) rotate(-90deg);
  ${props =>
    props.home &&
    css`
      transform: translate(0) rotate(0deg);
      left: 50%;
      top: 50%;
      margin-left: -107px;
      margin-top: -11.5px;
    `}
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 22px;
  margin: 0;
`
