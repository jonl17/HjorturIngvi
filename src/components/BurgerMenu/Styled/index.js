import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { COLORS } from "../../../constants"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${COLORS.black};
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
          font-size: 22.5px;
        `}
    `}
`
export const Item = styled.p`
  margin: 0;
  margin: auto;
  font-size: 20px;
  width: 200px;
  /* scaling */
  ${ItemScale}
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  transition: 0.2s ease-in-out;
  opacity: 0.6;
`
