import styled, { css } from "styled-components"
import Img from "gatsby-image"

export const Container = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 0 125px 125px 125px;
`

export const Name = styled.p`
  font-size: 50px;
  text-transform: uppercase;
  margin: 0 auto;
  padding-bottom: 75px;
  padding-top: 75px;
`

export const Content = styled.div`
  width: 600px;
  margin: auto;
  p {
    font-size: 22px;
    line-height: 160%;
    color: gray;
  }
`
export const ImageContainer = styled.div`
  width: 600px;
  margin: auto;
  padding-top: 75px;
`
export const Image = styled(Img)`
  height: 100%;
`
