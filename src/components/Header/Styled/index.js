import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 125px;
  width: 450px;
  left: 50%;
  margin-left: -225px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`
export const Text = styled.p`
  display: flex;
  align-items: flex-end;
  position: relative;
  .selected > div {
    width: 100% !important;
  }
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
`
export const Underline = styled.div`
  height: 100%;
  width: 0%;
  border-bottom: 1px solid;
  position: absolute;
  bottom: -15px;
  transition: 0.2s ease-in-out;
  pointer-events: none;
`
