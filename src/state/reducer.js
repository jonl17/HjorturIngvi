import { SET_DEVICE, TRIGGER_BURGER_WINDOW } from "./action"

const initialState = {
  device: undefined,
  burgerWindow: "closed",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE:
      let device
      if (action.width <= 750) {
        device = `mobile`
      }
      if (action.width > 750 && action.width <= 1050) {
        device = `tablet`
      }
      if (action.width > 1050) {
        device = `browser`
      }
      return { ...state, device: device }
    case TRIGGER_BURGER_WINDOW:
      return { ...state, burgerWindow: action.trigger }
    default:
      return state
  }
}
