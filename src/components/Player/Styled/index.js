import styled, { css } from "styled-components"
import Img from "gatsby-image"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  width: 200px;
  z-index: 8;
  margin: 25px 0 0 15px;
  ${props =>
    props.device === `browser` &&
    css`
      margin: 25px 0 0 75px;
    `}
`
export const PlayButtonContainer = styled.div`
  width: 30px;
  &&:hover {
    cursor: pointer;
  }
`
export const PlayButtonImage = styled(Img)`
  width: 100;
  height: 50px;
`
export const StopButtonContainer = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  width: 27px;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 5px;
  &&:hover {
    cursor: pointer;
  }
`
export const StopButtonImage = styled(Img)`
  height: 50px;
  width: 8px;
`
export const TrackInfo = styled.div`
  padding-top: 15px;
`

export const Name = styled.p`
  margin: 10px 0 0 0;
`
export const Audio = styled.audio`
  visibility: hidden;
  position: absolute;
`
