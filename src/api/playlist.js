import { callApi } from "./index";
import { generateURL, getHeaders } from "../shared/funs";

const URL = "api/playlists";

export const getAll = (query = {}) => {
  var _URL = generateURL(URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options, getHeaders());
}

export const getPlaylistTrack = (query = {}) => {
  var _URL = URL + "/tracks";
  _URL = generateURL(_URL, query);
  let options = {
    method: 'GET',
  }
  return callApi(_URL, options, getHeaders());
}

export const create = (data) => {
  var _URL = `${URL}/createPlaylist`;
  let options = {
    method: 'POST',
    data
  }
  return callApi(_URL, options, getHeaders());
}

export const add = (data) => {
  var _URL = `${URL}/addTrack`;
  let options = {
    method: 'POST',
    data
  }
  return callApi(_URL, options, getHeaders());
}

export const remove = (data) => {
  var _URL = `${URL}/removeTrack`;
  let options = {
    method: 'POST',
    data
  }
  return callApi(_URL, options, getHeaders());
}

