import styled, { css } from "styled-components"
import { COLORS } from "../../constants"

export const Container = styled.div`
  transition: 0.2s ease-in-out;
  opacity: 0;
  ${props =>
    props.device !== undefined &&
    css`
      opacity: 1;
    `}
  box-sizing: border-box;
  background: ${COLORS.background};
  min-height: 100%;
  width: 100%;
  position: relative;
  margin: auto auto -75px auto;
  display: flex;
  justify-content: center;
  align-content: center;
`
export const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 150px 15px 100px 15px;
  ${props =>
    props.device === `browser` &&
    css`
      width: 500px;
      padding: 130px 0px 100px 0px;
    `}
`
export const SidebarContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  * {
    pointer-events: all;
  }
`
