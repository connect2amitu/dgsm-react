import { callApi } from "./index";
import { generateURL } from "../shared/funs";

const URL = "api/albums";

export const getAlbums = (query) => {
  var _URL = generateURL(URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}

export const getAlbumWithTrack = (slug = "", query) => {
  var _URL = generateURL(URL + "/" + slug, query);

  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}

