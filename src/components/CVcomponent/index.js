/* components */
import { Container } from "./Styled"

/* tech */
import React from "react"

const CVcomponent = ({ cv }) => {
  return <Container dangerouslySetInnerHTML={{ __html: cv.html }}></Container>
}

export default CVcomponent
