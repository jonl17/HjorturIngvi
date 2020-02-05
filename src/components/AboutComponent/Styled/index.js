import styled from "styled-components"
import { STYLES } from "../../../constants"

export const Container = styled.div``

export const Content = styled.div`
  position: relative;
  width: 100%;
  line-height: ${STYLES.lineHeight};
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 25px;
  p {
    margin-top: 0;
  }
`
