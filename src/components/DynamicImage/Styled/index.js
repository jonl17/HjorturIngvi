import styled from "styled-components"
import Img from "gatsby-image"

export const Container = styled.div`
  position: relative;
  width: ${props => props.width};
  transition: 0.2s ease-in-out;
`
export const Image = styled(Img)``

export const Button = styled.button`
  height: 45px;
  width: 45px;
  position: absolute;
  left: -65px;
  top: 0px;
  background: transparent;
  border: none;
  outline: 0;

  &&:hover {
    cursor: pointer;
  }

  div {
    width: 100% !important;
    height: 100% !important;
  }
`

export const Icon = styled(Img)`
  height: 100%;
  width: 100%;
  position: absolute !important;
  top: 0;
  left: 0;
`
