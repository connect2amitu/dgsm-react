import queryString from 'query-string'

export const generateURL = (url, params) => {
  var _url = url;
  const stringified = queryString.stringify(params);
  if (stringified) {
    _url = _url + '?' + stringified;
  }
  return _url;
}