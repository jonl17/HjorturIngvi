import { SET_DEVICE, TRIGGER_BURGER_WINDOW, SET_CURRENT_PAGE } from "./action"

const initialState = {
  device: undefined,
  burgerWindow: "closed",
  currentPage: undefined,
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
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.page }
    default:
      return state
  }
}
