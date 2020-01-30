import React from "react"
import { useSelector } from "react-redux"

/** components */
import { LineComponent } from "./Styled"

const Line = () => {
  const duration = useSelector(state => state.reducer.duration)
  const currentTime = useSelector(state => state.reducer.currentTime)
  let width = (currentTime / duration) * 100
  return (
    <LineComponent
      width={currentTime > 0 && !isNaN(width) ? width : 0}
    ></LineComponent>
  )
}

export default Line
