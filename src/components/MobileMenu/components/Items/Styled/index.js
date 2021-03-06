import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin: 150px auto;
  padding: 10px 15px 100px 15px;
  text-align: center;
`
export const List = styled.div`
  padding-top: 20px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
`
export const Text = styled.p`
  font-size: 18px;
  margin-top: 10px;
`
export const Title = styled.h1`
  font-size: 25px;
  margin: 0;
`
export const Subtitle = styled.p`
  margin: 10px;
`
export const SocialMediaContainer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 75px;
`
