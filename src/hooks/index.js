import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useDispatchToStore = action => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action)
  }, [])
}
