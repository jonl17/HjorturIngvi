import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { COLORS } from "../../../constants"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  height: ${props => props.height};
  width: 100%;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const ItemScale = css`
  ${props =>
    props.device === `mobile` &&
    css`
      margin: 37px auto auto 25px;
      ${props =>
        props.head &&
        css`
          font-size: 20px;
        `}
    `}
`
export const Item = styled.p`
  margin: 0;
  margin: auto;
  font-size: 20px;
  /* scaling */
  ${ItemScale}
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: ${COLORS.black};
  text-transform: uppercase;
  transition: 0.2s ease-in-out;
`
