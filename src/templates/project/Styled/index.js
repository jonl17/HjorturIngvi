import styled from "styled-components"
import Img from "gatsby-image"

export const Container = styled.div``
export const Title = styled.h1``
export const Content = styled.div`
  line-height: 152%;
  padding-bottom: 15px;
  a {
    text-decoration: none;
    color: black;
    font-style: italic;
  }
  blockquote > p {
    font-family: "Grotesk fat";
  }
  p > .gatsby-resp-image-wrapper {
    width: 40%;
    margin-left: 0 !important;
    transition: 0.2s ease-in-out;
  }

  p > .plus {
    position: absolute;
    left: -85px;
    top: 30px;
  }
  p > .plus:hover {
    cursor: pointer;
  }
  p {
    position: relative;
  }
`

export const Image = styled(Img)`
  height: 25px;
  width: 25px;
`
