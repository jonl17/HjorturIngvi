import React from "react"
import { Container, Line } from "./Styled"
import { useSelector, useDispatch } from "react-redux"
import { triggerMobileMenu } from "../../state/action"

// open burger menu
const dispatches = dispatch => {
  dispatch(triggerMobileMenu("open"))
}

const Burger = () => {
  const mobileMenu = useSelector(state => state.reducer.mobileMenu)
  const dispatch = useDispatch()
  return mobileMenu === "closed" ? (
    <Container onClick={() => dispatches(dispatch)}>
      <Line one></Line>
      <Line two></Line>
      <Line three></Line>
    </Container>
  ) : (
    <Container onClick={() => dispatch(triggerMobileMenu("closed"))}>
      <Line one ex></Line>
      <Line three ex></Line>
    </Container>
  )
}

export default Burger
