import { callApi } from "./index";
import { generateURL } from "../shared/funs";

const URL = "api/quote";

export const getQuotes = (query) => {
  var _URL = generateURL(URL, query);
  let options = {
    method: 'POST',
  }
  return callApi(_URL, options);
}

export const getQuotesTitle = (query) => {
  var _URL = URL + "/getQuoteTopics";
  _URL = generateURL(_URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}

