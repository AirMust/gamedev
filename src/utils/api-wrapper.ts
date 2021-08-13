import { AxiosRequestConfig } from 'axios';
import { ApiRequestProps, ApiResponse, ResponseStatus } from 'api/types';
import { AUTH_TOKEN_NAME } from 'api/config';


export const callApi: (params: ApiRequestProps) => Promise<ApiResponse> = async ({
  method,
  url,
  data,
  params,
  authRequired = false,
  formData = false,
}) => {
  const authToken = localStorage?.getItem(AUTH_TOKEN_NAME) || '';

  const response: ApiResponse = {
    status: ResponseStatus.SUCCESS,
    data: null,
  };

  const requestConfig: AxiosRequestConfig = {
    headers: {},
    method,
    url,
    withCredentials: true,
    validateStatus(status) {
      if (status < 400) {
        return true;
      }
      if (status === 401) {
        // убрал диспатч, т.к. он создает циклические импорты
        // либо как-то меняют порядок импортов.
        // Вследствие чего при сборке редюсеров userSlice еще undefined.
        // store.dispatch(userActions.logout());
      }
      return false;
    },
  };
  if (authRequired && authToken) {
    requestConfig.headers.Authorization = `Token ${authToken}`;
  }

  requestConfig.headers['Content-Type'] = 'application/json';

  if (formData) {
    requestConfig.headers['Content-Type'] = 'multipart/form-data';
  }

  if (data) {
    requestConfig.data = data;
  }

  if (params) {
    requestConfig.params = params;
  }

  await fetch(url, {
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(requestConfig.data),
    ...requestConfig,
  })
    .then((resp) => {
      if (resp.body) {
        response.data = resp.body;
      }
      response.data = 'OK';
    })
    .catch((error) => {
      if (error.response?.data?.reason) {
        throw new Error(error.response.data.reason);
      } else {
        throw new Error(error.message);
      }
    });
  return response;
};
