import React from "react"

/** components */
import { Container, Title, Subtitle } from "./Styled"

const Frontpage = ({ title, subtitle }) => {
  return (
    <Container>
      <Title className="bold">{title}</Title>
      <Subtitle className="bold">{subtitle}</Subtitle>
    </Container>
  )
}

export default Frontpage
