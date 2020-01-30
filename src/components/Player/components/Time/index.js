import React from "react"
import { useSelector } from "react-redux"

/** components */
import { Text } from "./Styled"

const convertToReadableTime = millis => {
  var minutes = Math.floor(millis / 60)
  var seconds = ((millis % 60) / 1).toFixed(0)
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}

const Time = () => {
  // store variables
  const duration = useSelector(state => state.reducer.duration)
  const currentTime = useSelector(state => state.reducer.currentTime)

  let timeInMs = duration - currentTime
  return !isNaN(timeInMs) ? (
    <Text>{convertToReadableTime(timeInMs)}</Text>
  ) : (
    <></>
  )
}

export default Time
