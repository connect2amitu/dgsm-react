import { callApi } from "./index";
import { generateURL } from "../shared/funs";

const URL = "api/browse";

export const getBrowseData = (query) => {
  var _URL = generateURL(URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}