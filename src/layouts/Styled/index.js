import styled from "styled-components"
import { COLORS } from "../../constants"

export const Container = styled.div`
  box-sizing: border-box;
  background: ${COLORS.background};
  min-height: 100%;
  width: 100%;
  position: relative;
  margin-bottom: -75px;
`
export const PageContainer = styled.div`
  padding-top: 150px;
  padding-bottom: 150px;
  height: 100%;
  width: 100%;
`
export const SidebarContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
`
