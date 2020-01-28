import styled from "styled-components"
import Img from "gatsby-image"
import { COLORS } from "../../../constants"

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100px;
  width: 200px;
  margin-left: 75px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const PlayButtonContainer = styled.div`
  height: 30px;
  width: 30px;
`
export const PlayButtonImage = styled(Img)`
  width: 100;
`
export const TrackInfo = styled.div`
  margin-top: 40px;
  color: ${COLORS.blue};
`
export const Name = styled.p`
  margin: 0;
`
export const Time = styled.p`
  margin: 0;
`
