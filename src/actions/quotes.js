import { QUOTE } from "../shared/constants";

export function getQuotes(data) {
  return {
    type: QUOTE.FETCH_START,
    isLoading: true,
    payload: data
  }
}

export function clearQuote() {
  return {
    type: QUOTE.CLEAR_ALL,
  }
}
