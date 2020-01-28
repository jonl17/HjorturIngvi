import styled from "styled-components"
import { COLORS } from "../../../constants"

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 75px;
  width: 500px;
  left: 50%;
  bottom: 0;
  margin-left: -250px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
`
export const Anchor = styled.a`
  text-decoration: none;
  color: ${COLORS.blue};
  display: flex;
  align-items: center;
`
export const Text = styled.p`
  box-sizing: border-box;
  padding-left: 15px;
  margin: 0;
`
export const Circle = styled.span`
  height: 15px;
  width: 15px;
  background: ${COLORS.blue};
  border-radius: 50%;
`
