import { callApi } from "./index";
import { generateURL } from "../shared/funs";

const URL = "api/playlists";

export const getAll = (query = {}) => {
  var _URL = generateURL(URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}

export const getPlaylistTrack = (query = {}) => {
  var _URL = URL + "/tracks";
  _URL = generateURL(_URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options);
}

export const create = (data) => {
  var _URL = `${URL}/createPlaylist`;
  let options = {
    method: 'POST',
    data
  }
  return callApi(_URL, options);
}

export const add = (data) => {
  var _URL = `${URL}/addTrack`;
  let options = {
    method: 'POST',
    data
  }
  return callApi(_URL, options);
}

