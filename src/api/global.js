import { callApi } from "./index";

const URL = "api/users";

export const createUser = (data) => {
  console.log('createUser data =>', data);

  let _URL = `${URL}/createUser`
  let options = {
    method: 'POST',
    data: data
  }
  let headers = {
    'Content-Type': "application/json"
  }
  return callApi(_URL, options, headers);
}

