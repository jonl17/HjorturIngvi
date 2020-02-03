import React from "react"

/* components */
import { Container, Name, Info } from "./Styled"

const Contactcomponent = ({ contactInfo: { email, telephone } }) => {
  return (
    <>
      <Container>
        <Name>Email</Name>
        <Info>{email}</Info>
      </Container>
      <Container>
        <Name>Telephone</Name>
        <Info>{telephone}</Info>
      </Container>
    </>
  )
}

export default Contactcomponent
