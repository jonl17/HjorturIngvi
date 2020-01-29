import styled from "styled-components"
import { COLORS } from "../../constants"

export const Container = styled.div`
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
  padding-top: 130px;
  padding-bottom: 100px;
  height: 100%;
  width: 500px;
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
