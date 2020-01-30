import styled from "styled-components"
import Img from "gatsby-image"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  width: 200px;
  margin-left: 75px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 8;
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
  height: 100%;
  width: 8px;
`
export const TrackInfo = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
`

export const Name = styled.p`
  margin: 5px 0;
`
export const Time = styled.p`
  margin: 5px 0;
`
export const Audio = styled.audio`
  visibility: hidden;
`
