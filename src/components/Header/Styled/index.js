import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { COLORS } from "../../../constants"

const ContainerScale = css`
  ${props =>
    props.device === `tablet` &&
    css`
      padding: 0;
    `}
  ${props =>
    props.device === `mobile` &&
    css`
      padding: 0;
    `}
`

export const Container = styled.div`
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  padding: 0 100px 0 100px;
  box-sizing: border-box;
  /** scaling */
  ${ContainerScale}
`

const ItemScale = css`
  ${props =>
    props.device === `mobile` &&
    css`
      ${props =>
        !props.home &&
        css`
          display: none;
        `}
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
