import React, { useRef, useEffect } from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { playPause, setSongDuration, setCurrentTime } from "../../state/action"

/* components */
import {
  Container,
  PlayButtonContainer,
  PlayButtonImage,
  StopButtonContainer,
  StopButtonImage,
  TrackInfo,
  Name,
  Audio,
} from "./Styled"
import Line from "./components/Line"
import Time from "./components/Time"

const Player = ({
  data: {
    rectOne: { fluid: stoplineone },
    rectTwo: { fluid: stoplinetwo },
    play: { fluid: playbtn },
    song: {
      frontmatter: {
        songtitle,
        song: { publicURL },
      },
    },
  },
}) => {
  // store variables
  const play = useSelector(state => state.reducer.play)
  const device = useSelector(state => state.reducer.device)

  const dispatch = useDispatch()

  // player ref
  const myPlayer = useRef()

  const playSong = () => {
    myPlayer.current.play()
    dispatch(setSongDuration(myPlayer.current.duration))
  }
  const pauseSong = () => {
    myPlayer.current.pause()
  }

  // update current time of song every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (myPlayer.current.currentTime !== undefined) {
        dispatch(setCurrentTime(myPlayer.current.currentTime))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <Container device={device}>
      {!play ? (
        <PlayButtonContainer
          onClick={() => {
            dispatch(playPause())
            playSong()
          }}
        >
          <PlayButtonImage fluid={playbtn}></PlayButtonImage>
        </PlayButtonContainer>
      ) : (
        <StopButtonContainer
          onClick={() => {
            dispatch(playPause())
            pauseSong()
          }}
        >
          <StopButtonImage fluid={stoplineone}></StopButtonImage>
          <StopButtonImage fluid={stoplinetwo}></StopButtonImage>
        </StopButtonContainer>
      )}
      <TrackInfo>
        <Name>{songtitle}</Name>
        <Time></Time>
      </TrackInfo>
      <Audio ref={myPlayer} controls>
        <source src={publicURL}></source>
      </Audio>
      <Line></Line>
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
        song: markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
          frontmatter {
            songtitle
            song {
              publicURL
            }
          }
        }
      }
    `}
    render={data => <Player data={data} {...props}></Player>}
  ></StaticQuery>
)
