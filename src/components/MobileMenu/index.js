import React from "react"
import { useSelector } from "react-redux"

/* components */
import { Container } from "./Styled"

const MobileMenu = () => {
  const mobileMenu = useSelector(state => state.reducer.mobileMenu)
  return <Container open={mobileMenu === `open`}>MobileMenu</Container>
}

export default MobileMenu
