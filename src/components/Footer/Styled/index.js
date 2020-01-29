import styled from "styled-components"

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  width: 500px;
  left: 50%;
  bottom: 0;
  margin-left: -250px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
`
export const Anchor = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: inherit;
  transition: 0.2s ease-in-out;
  &&:hover {
    opacity: 0.7;
  }
`
export const Text = styled.p`
  box-sizing: border-box;
  padding-left: 15px;
  margin: 0;
`
export const Circle = styled.span`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: black;
`
