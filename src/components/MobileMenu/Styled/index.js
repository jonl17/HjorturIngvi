import styled, { css } from "styled-components"
import { COLORS } from "../../../constants"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${COLORS.blueRGBA};
  overflow: hidden;
  transition: 0.2s ease-in-out;
  /** closed */
  opacity: 0;
  pointer-events: none;
  /** open */
  ${props =>
    props.open &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`
