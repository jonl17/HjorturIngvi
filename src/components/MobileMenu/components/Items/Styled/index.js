import styled from "styled-components"
import { Link } from "gatsby"

export const Container = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin: 150px auto;
  padding: 35px 15px 100px 15px;
  text-align: center;
`
export const List = styled.div`
  padding-top: 40px;
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
  margin-top: 25px;
`
export const Title = styled.h1`
  font-size: 25px;
  margin: 0;
`
export const Subtitle = styled.p`
  margin: 10px;
`
