import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 75px;
  width: 500px;
  left: 50%;
  margin-left: -250px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 4;
`
export const Text = styled.p`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 100%;
  .selected > span {
    width: 100% !important;
  }
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
  &&:hover {
    opacity: 0.7;
  }
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
