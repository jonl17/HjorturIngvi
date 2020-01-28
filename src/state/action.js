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
