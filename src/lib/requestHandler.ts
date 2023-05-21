import axios, { AxiosRequestHeaders } from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const BASE_HEADER = {
  'Content-Type': 'application/json',
};

const RequestHandler = (headers: AxiosRequestHeaders = BASE_HEADER) => {
  const api = axios.create({
    baseURL: BASE_URL,
    headers: headers,
  });
  api.interceptors.request.use(BeforeTransform);
  return api;
};

const Validate = (status: number) => status < 400;

const ErrorParser = (response: any) => {
  const http_status = response.status;
  const http_status_message = response.statusText;
  const error_data = response.data;
  return [http_status, http_status_message, error_data.message, error_data];
};

const BaseErrorHandler = <T>(err: any): any => {
  let status = 500;
  let message = '';
  let http_status_message = '';
  let details = null;
  if (err.response) {
    //サーバー側からerrorが帰ってきたケース
    [status, http_status_message, message, details] = ErrorParser(err.response);
  } else if (err.request) {
    //サーバー側から応答がない
    message =
      'Unable to connect to the server or there is no response. Please check your connection.';
  } else {
    //その他例外
    message = 'A system error has occurred.';
  }
  const result = {} as any;

  if (status == 401) {
    // 認証失敗
    localStorage.removeItem('loginState');
  }

  return {
    error: { message: message, content: details || err },
    result: result,
    status: status,
  };
};

const BaseSuccessHandler = <T>(response: any): any => {
  //todo: success handling
  const result = response as any;
  return { error: null, result: result, status: response.status };
};

const BeforeTransform = async (request: any) => {
  const loginState = localStorage ? localStorage.loginState : null;
  if (loginState) {
    const stateJson = JSON.parse(loginState);
    if (stateJson.jwt) {
      request.headers['Authorization'] = stateJson.jwt;
    }
  }
  return request;
};

export const getRequest = async <T>(url: string): Promise<any> => {
  const res = await RequestHandler()
    .get(url, { validateStatus: Validate })
    .then(BaseSuccessHandler)
    .catch(BaseErrorHandler);
  const response = res as any;

  return Promise.resolve(response);
};

const affectedRequest = async <T>(handler: any): Promise<any> => {
  const res = await handler.then(BaseSuccessHandler).catch(BaseErrorHandler);
  const response = res as any;
  return Promise.resolve(response);
};

export const postRequest = async <T>(
  url: string,
  data: object,
  headers: AxiosRequestHeaders = BASE_HEADER
): Promise<any> => {
  const postHandler = RequestHandler(headers).post(url, data, {
    validateStatus: Validate,
  });
  return affectedRequest(postHandler);
};

export const putRequest = async <T>(
  url: string,
  data: object,
  headers: AxiosRequestHeaders = BASE_HEADER
): Promise<any> => {
  const putHanelder = RequestHandler(headers).put(url, data, {
    validateStatus: Validate,
  });
  return affectedRequest(putHanelder);
};

export const deleteRequest = async <T>(
  url: string,
  data: object,
  headers: AxiosRequestHeaders = BASE_HEADER
): Promise<any> => {
  const deleteHandler = RequestHandler(headers).delete(url, data);
  return affectedRequest(deleteHandler);
};
