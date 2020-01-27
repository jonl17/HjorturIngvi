import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 75px;
`
export const Text = styled.p`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 100%;
  padding-top: 75px;
  .selected > span {
    width: 100% !important;
  }
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
`
export const Underline = styled.span`
  height: 100%;
  width: 0%;
  border-bottom: 1px solid;
  position: absolute;
  bottom: -15px;
  transition: 0.2s ease-in-out;
  pointer-events: none;
`
