import { GLOBAL } from "../shared/constants";

export function changeTheme(data) {
  return {
    type: GLOBAL.CHANGE_THEME,
    payload: data
  }
}