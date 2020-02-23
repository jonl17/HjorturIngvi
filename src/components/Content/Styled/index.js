import styled from "styled-components"
import { STYLES } from "../../../constants"
import Img from "gatsby-image"

// the html inject component
export const Container = styled.div`
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
  p > .gatsby-resp-image-wrapper {
    width: 100%;
    margin-left: 0 !important;
    transition: 0.2s ease-in-out;
  }
  /* p > .gatsby-resp-image-wrapper:hover {
    width: 40%;
  } */
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
  .gatsby-resp-image-link {
    pointer-events: none;
  }
  @media only screen and (max-width: 600px) {
    p > .gatsby-resp-image-wrapper {
      width: 100% !important;
      margin-left: 0px !important;
      transition: 0.2s ease-in-out;
    }

    p > .plus {
      display: none;
    }
  }
`
// for the plus icon
export const Image = styled(Img)`
  height: 25px;
  width: 25px;
`
