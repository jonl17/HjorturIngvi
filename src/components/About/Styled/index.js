import styled from "styled-components"
import Img from "gatsby-image"

export const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /** browser width */
  width: 850px;
  margin: 100px auto;
`
export const Content = styled.div`
  p {
    font-size: 20px;
    line-height: 160%;
    margin: 0;
  }
`
export const ImageContainer = styled.div`
  height: 400px;
  width: 100%;
`
export const Image = styled(Img)`
  height: 100%;
  width: 100%;
`
