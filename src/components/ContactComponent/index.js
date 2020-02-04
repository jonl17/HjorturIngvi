import React from "react"

/* components */
import { Container, Name, Info } from "./Styled"

const Contactcomponent = ({ contactInfo: { email, telephone } }) => {
  return (
    <>
      <Container>
        <Name>Email</Name>
        <Info className="bold">{email}</Info>
      </Container>
      <Container>
        <Name>Telephone</Name>
        <Info className="bold">{telephone}</Info>
      </Container>
    </>
  )
}

export default Contactcomponent
