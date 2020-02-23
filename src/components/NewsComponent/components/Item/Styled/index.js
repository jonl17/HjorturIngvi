import styled from "styled-components"
import { STYLES } from "../../../../../constants"
import Img from "gatsby-image"

export const Date = styled.p`
  font-size: 14px;
`
export const Title = styled.h1`
  font-size: 22px;
`
export const Content = styled.div`
  border-bottom: 1px solid;
  line-height: ${STYLES.lineHeight};
  padding-bottom: 15px;
  a {
    text-decoration: none;
    color: black;
    font-style: italic;
  }
  blockquote > p {
    font-family: "Grotesk fat";
  }
`
export const ImageContainer = styled.div`
  width: 65%;
`
export const Image = styled(Img)``
