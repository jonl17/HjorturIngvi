import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"

export const Container = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 150px 15px 100px 15px;
`
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75px;
  justify-content: center;
  align-items: center;
`
export const PageName = styled.h1`
  text-align: center;
  margin-bottom: 35px;
  margin-top: 0;
  position: absolute;
  margin: auto;
`
export const Underline = styled.span`
  border-bottom: 1px solid black;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  bottom: -15px;
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
`
export const Image = styled(Img)`
  position: absolute !important;
  left: -35px;
  height: 35px;
  width: 35px;
  top: -5px;
`
