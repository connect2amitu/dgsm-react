import { QUOTE } from "../shared/constants";

export function getQuotes(data) {
  return {
    type: QUOTE.FETCH_START,
    payload: data
  }
}

export function getTitle(data) {
  return {
    type: QUOTE.FETCH_TITLE_START,
    payload: data
  }
}

export function clearQuote() {
  return {
    type: QUOTE.CLEAR_ALL,
  }
}
