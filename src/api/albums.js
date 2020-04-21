import { callApi } from "./index";
import { generateURL } from "../shared/funs";
var URL = "api/albums";


export const getAlbums = (query) => {
  var _URL = generateURL(URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}

