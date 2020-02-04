import styled, { css } from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"

export const Title = styled.p``
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  margin-left: -35px;
  ${props =>
    props.device !== `browser` &&
    css`
      margin-left: 0;
    `}
`
export const Image = styled(Img)`
  height: 35px;
  width: 35px;
`
