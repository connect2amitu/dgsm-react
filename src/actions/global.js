import { GLOBAL } from "../shared/constants";

export function changeTheme(data) {
  return {
    type: GLOBAL.CHANGE_THEME,
    payload: data
  }
}
export function addAuthUser(data) {
  return {
    type: GLOBAL.AUTH_USER_START,
    payload: data
  }
}

export function logout() {
  return {
    type: GLOBAL.LOGOUT,
  }
}