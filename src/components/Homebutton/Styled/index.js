import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  position: absolute;
  display: inline-block;
  left: 75px;
  bottom: 55%;
  transform: translateX(-105px) rotate(-90deg);
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 22px;
  margin: 0;
`
