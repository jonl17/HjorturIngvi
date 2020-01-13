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
  position: fixed;
  top: 0;
  right: 150px;
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 100px);
  box-sizing: border-box;
  /** scaling */
  ${ContainerScale}
`

const AnchorScale = css`
  ${props =>
    props.device === `mobile` &&
    css`
      opacity: 1;
    `}
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: ${COLORS.black};
  text-transform: uppercase;
  transition: 0.1s ease-in-out;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  padding-top: 20px;
  ${AnchorScale}
`

export const Name = styled.p`
  position: fixed;
  left: 25px;
  top: 0;
  height: 100px;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 22.5px;
  text-transform: uppercase;
  padding-top: 10px;
`
export const BlackKey = styled.span`
  position: absolute;
  top: 0;
  height: 45px;
  width: 25px;
  border-radius: 2.5px;
  transition: 0.1s;
  ${Anchor}:hover & {
    background: ${COLORS.black};
  }
`
