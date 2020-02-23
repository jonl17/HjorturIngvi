import styled from "styled-components"
import Img from "gatsby-image"

export const Container = styled.div`
  position: relative;
  width: ${props => props.width};
  transition: 0.2s ease-in-out;
`
export const Image = styled(Img)``

export const Icon = styled(Img)`
  height: 45px;
  width: 45px;
  position: absolute !important;
  left: -65px;
  top: 0px;
  &&:hover {
    cursor: pointer;
  }
`
