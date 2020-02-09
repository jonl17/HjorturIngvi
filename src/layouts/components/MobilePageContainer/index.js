/** components */
import { Container, PageName, TitleBox, Underline } from "./Styled"
import HomeTitle from "./components/HomeTitle"

/** tech */
import React from "react"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const MobilePageContainer = ({ children, location }) => {
  const name = location.pathname
    .replace("/", "")
    .replace("/", "")
    .replace("-", " ")
  return (
    <Container>
      <HomeTitle></HomeTitle>
      <TitleBox>
        <PageName className="bold">
          {capitalizeFirstLetter(name)} <Underline></Underline>
        </PageName>
      </TitleBox>
      {children}
    </Container>
  )
}

export default MobilePageContainer
