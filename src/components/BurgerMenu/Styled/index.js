import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { COLORS } from "../../../constants"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: gray;
  height: ${props => props.height};
  width: 100%;
  transition: 0.2s ease-in-out;
  overflow: hidden;
`

const ItemScale = css`
  ${props =>
    props.device === `mobile` &&
    css`
      margin: auto auto auto 25px;
    `}
`
export const Item = styled.p`
  margin: 0;
  margin: auto;
  ${props =>
    props.home &&
    css`
      font-size: 20px;
    `}
  /* scaling */
  ${ItemScale}
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: ${COLORS.black};
  text-transform: uppercase;
  opacity: 0.6;
  transition: 0.2s ease-in-out;
  &&:hover {
    opacity: 1;
  }
`
