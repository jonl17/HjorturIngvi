import styled from "styled-components"
import { Link } from "gatsby"

export const Box = styled.div`
  width: 200px;
  position: absolute;
  top: 40px;
  z-index: 10;
`

export const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  line-height: 115%;
`
export const Subtitle = styled.p`
  margin: 0px;
  margin-top: 10px;
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
`
