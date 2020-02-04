import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"

export const Title = styled.p``
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  margin-left: -35px;
`
export const Image = styled(Img)`
  height: 35px;
  width: 35px;
`
