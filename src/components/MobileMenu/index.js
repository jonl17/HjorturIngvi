import React from "react"
import { useSelector } from "react-redux"

/* components */
import { Container } from "./Styled"
import Items from "./components/Items"

const MobileMenu = () => {
  const mobileMenu = useSelector(state => state.reducer.mobileMenu)
  return (
    <Container open={mobileMenu === `open`}>
      <Items></Items>
    </Container>
  )
}

export default MobileMenu
