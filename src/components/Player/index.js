import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import {
  Container,
  PlayButtonContainer,
  PlayButtonImage,
  TrackInfo,
  Name,
  Time,
} from "./Styled"

const Player = ({
  data: {
    imageSharp: { fluid },
  },
}) => {
  return (
    <Container>
      <PlayButtonContainer>
        <PlayButtonImage fluid={fluid}></PlayButtonImage>
      </PlayButtonContainer>
      <TrackInfo>
        <Name>24 pictures: Cascade</Name>
        <Time>2:15</Time>
      </TrackInfo>
    </Container>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        imageSharp(fluid: { originalName: { eq: "paly.png" } }) {
          fluid(quality: 95) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    `}
    render={data => <Player data={data} {...props}></Player>}
  ></StaticQuery>
)
