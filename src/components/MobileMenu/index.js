import React from "react"
import { useSelector } from "react-redux"

/* components */
import { Container, SocialMediaContainer } from "./Styled"
import Items from "./components/Items"
import SocialMediaLinks from "../SocialMediaLinks"

const MobileMenu = () => {
  const mobileMenu = useSelector(state => state.reducer.mobileMenu)
  return (
    <Container open={mobileMenu === `open`}>
      <Items></Items>
      <SocialMediaContainer>
        <SocialMediaLinks></SocialMediaLinks>
      </SocialMediaContainer>
    </Container>
  )
}

export default MobileMenu
