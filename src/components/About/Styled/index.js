import styled from "styled-components"
import Img from "gatsby-image"

export const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /** browser width */
  width: 850px;
  margin: auto;
  padding-top: 100px;
`
export const Content = styled.div`
  p {
    font-size: 20px;
    line-height: 160%;
    margin: 0;
  }
`
