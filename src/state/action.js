export const SET_DEVICE = "SET_DEVICE"
export const setDevice = width => ({
  type: SET_DEVICE,
  width,
})
export const TRIGGER_BURGER_WINDOW = "TRIGGER_BURGER_WINDOW"
export const triggerBurgerWindow = trigger => ({
  type: TRIGGER_BURGER_WINDOW,
  trigger,
})
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE,
  page,
})
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE"
export const changeLanguage = () => ({
  type: CHANGE_LANGUAGE,
})
// plays song if store.play is false | pauses if store.play is true
export const PLAY_PAUSE = "PLAY_PAUSE"
export const playPause = () => ({
  type: PLAY_PAUSE,
})
// registering both song duration
export const SET_SONG_DURATION = "SET_SONG_DURATION"
export const setSongDuration = duration => ({
  type: SET_SONG_DURATION,
  duration,
})
// + currentTime
export const SET_CURRENT_TIME = "SET_CURRENT_TIME"
export const setCurrentTime = time => ({
  type: SET_CURRENT_TIME,
  time,
})
