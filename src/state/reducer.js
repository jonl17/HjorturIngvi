import {
  SET_DEVICE,
  TRIGGER_BURGER_WINDOW,
  SET_CURRENT_PAGE,
  CHANGE_LANGUAGE,
  PLAY_PAUSE,
  SET_CURRENT_TIME,
  SET_SONG_DURATION,
} from "./action"

const initialState = {
  device: undefined,
  burgerWindow: "closed",
  currentPage: undefined,
  icelandic: false,
  play: false,
  duration: undefined,
  currentTime: undefined,
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
    case SET_SONG_DURATION:
      return { ...state, duration: action.duration }
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.time }
    default:
      return state
  }
}
