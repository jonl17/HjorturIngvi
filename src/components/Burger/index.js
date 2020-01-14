import React from "react"
import { Container, Line } from "./Styled"
import { useSelector, useDispatch } from "react-redux"
import { triggerBurgerWindow } from "../../state/action"

// open burger menu
const dispatches = dispatch => {
  dispatch(triggerBurgerWindow("open"))
}

const Burger = () => {
  const burgerWindow = useSelector(state => state.reducer.burgerWindow)
  const dispatch = useDispatch()
  return burgerWindow === "closed" ? (
    <Container onClick={() => dispatches(dispatch)}>
      <Line one></Line>
      <Line two></Line>
      <Line three></Line>
    </Container>
  ) : (
    <Container onClick={() => dispatch(triggerBurgerWindow("closed"))}>
      <Line one ex></Line>
      <Line three ex></Line>
    </Container>
  )
}

export default Burger
