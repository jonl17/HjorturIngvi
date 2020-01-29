import React from "react"
import { useSelector } from "react-redux"

/** components */
import { LineComponent } from "./Styled"

const Line = () => {
  const duration = useSelector(state => state.reducer.duration)
  const currentTime = useSelector(state => state.reducer.currentTime)
  const play = useSelector(state => state.reducer.play)
  let width = (currentTime / duration) * 100
  console.log(width)
  return <LineComponent width={width}></LineComponent>
}

export default Line
