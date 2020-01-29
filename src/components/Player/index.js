import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { playPause } from "../../state/action"

/* components */
import {
  Container,
  PlayButtonContainer,
  PlayButtonImage,
  StopButtonContainer,
  StopButtonImage,
  TrackInfo,
  Name,
  Time,
} from "./Styled"

const Player = ({
  data: {
    rectOne: { fluid: stoplineone },
    rectTwo: { fluid: stoplinetwo },
    play: { fluid: playbtn },
  },
}) => {
  const play = useSelector(state => state.reducer.play)
  const dispatch = useDispatch()
  return (
    <Container>
      {!play ? (
        <PlayButtonContainer onClick={() => dispatch(playPause())}>
          <PlayButtonImage fluid={playbtn}></PlayButtonImage>
        </PlayButtonContainer>
      ) : (
        <StopButtonContainer onClick={() => dispatch(playPause())}>
          <StopButtonImage fluid={stoplineone}></StopButtonImage>
          <StopButtonImage fluid={stoplinetwo}></StopButtonImage>
        </StopButtonContainer>
      )}
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
        play: imageSharp(fluid: { originalName: { eq: "paly.png" } }) {
          fluid(quality: 95) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
        rectOne: imageSharp(
          fluid: { originalName: { eq: "Rectangle_1.png" } }
        ) {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
        rectTwo: imageSharp(
          fluid: { originalName: { eq: "Rectangle_2.png" } }
        ) {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    `}
    render={data => <Player data={data} {...props}></Player>}
  ></StaticQuery>
)
