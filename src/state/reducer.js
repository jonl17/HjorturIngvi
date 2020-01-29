import {
  SET_DEVICE,
  TRIGGER_BURGER_WINDOW,
  SET_CURRENT_PAGE,
  CHANGE_LANGUAGE,
  PLAY_PAUSE,
} from "./action"

const initialState = {
  device: undefined,
  burgerWindow: "closed",
  currentPage: undefined,
  icelandic: false,
  play: false,
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
    case CHANGE_LANGUAGE:
      return { ...state, icelandic: !state.icelandic }
    // plays song if store.play is false | pauses if store.play is true
    case PLAY_PAUSE:
      return { ...state, play: !state.play }
    default:
      return state
  }
}
