export const constant = {
  REQUEST_HEADER: { 'Access-Control-Allow-Origin': '*' },
  AUTH_ACCOUNT: {
    username: 'api',
    password: 'fAnIajQJhFtQjdUIFf1pTdDwr64',
  },
  API_ENDPOINT: 'https://staging-finance.rabbitinternet.com/',
};

export enum MESSAGE_SERVER {
  SERVER_ERROR = 'Something went wrong, try again latter !',
}

export const CUSTOM_MESSAGE = (message: string) => {
  return message;
};

export const GET_SUCCESS = (type: string) => {
  return `Get ${type} successfully !`;
};

export const CREATE_SUCCESS = (type: string) => {
  return `Create ${type} successfully !`;
};

export enum STATUS_SERVER {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL = 500,
}
