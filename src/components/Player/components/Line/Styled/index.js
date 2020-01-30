import styled from "styled-components"

export const LineComponent = styled.div`
  height: 8px;
  background: transparent;
  width: 0;
  width: ${props => props.width}%;
  border-bottom: 1px solid black;
  transition: 0.2s;
`
