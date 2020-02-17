import React from "react"

/* components */
import { Container, Name, Info, Anchor } from "./Styled"

const Contactcomponent = ({ contactInfo: { email, telephone } }) => {
  return (
    <>
      <Container>
        <Name>Email</Name>
        <Info>
          <Anchor className="bold" target="_blank" href={"mailto:" + email}>
            {email}
          </Anchor>
        </Info>
      </Container>
      <Container>
        <Name>Telephone</Name>
        <Info className="bold">{telephone}</Info>
      </Container>
    </>
  )
}

export default Contactcomponent
