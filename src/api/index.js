import axios from 'axios';
// import store from '../store'
// import { progressStart } from '../action/common/progress'
import { HOST_API, VALIDATION_FAILURE_STATUS, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } from '../shared/constants';
import history from '../shared/history';
import { SESSION_EXPIRED_URL } from '../shared/constants';

export const callApi = (path, data, headers) => {
  const url = `${HOST_API}/${path}`;
  let defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  let _headers = {
    ...defaultHeaders,
    ...headers
  }
  let apiRequestObject = {
    ...data,
    url: url,
    headers: _headers,
    // onUploadProgress: function (progressEvent) {
    //   let per = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    //   store.dispatch(progressStart(per));
    // }
  }
  return axiosCall(apiRequestObject);
};

function axiosCall(apiRequestObject) {
  return axios(apiRequestObject).then(function (res) {
    return res.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status === UNAUTHORIZED) {
        history.replace(SESSION_EXPIRED_URL);
        // return error.response.data;
      } else if (error.response.status === BAD_REQUEST) {
        throw ApiError(error.response.data.message, error.response.data, error.response.status);
      } else if (error.response.status === NOT_FOUND) {
        throw ApiError(`Request not found! please try again later.`, null, error.response.status);
      } else if (error.response.status === VALIDATION_FAILURE_STATUS) {
        throw ApiError(`Validation errors.`, error.response.data, error.response.status);
      } else {
        throw ApiError(`Request failed with status ${error.response.status}.`, error.response.data, error.response.status);
      }
    } else {
      throw ApiError(error.toString(), null, 'REQUEST_FAILED');
    }
  });
}

// Custom API error to throw
function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  return {
    response,
    message,
    status,
    toString: () => {
      return `${this.message}\nResponse:\n${isObject ? JSON.stringify(this.response, null, 2) : this.response}`;
    },
  };
}