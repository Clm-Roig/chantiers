import axios, { AxiosError, isAxiosError } from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json'
  }
});

export const getErrorMessage = (error: AxiosError | Error): string => {
  let message = 'An unexpected error occured.';
  if (isAxiosError(error)) {
    if (error.response !== undefined) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const {
        response: { status }
      } = error;
      if (status >= 400 && status < 500) {
        message = 'Something went wrong with your request.';
      }
      if (status > 500) {
        message = 'A server error occured.';
      }
    } else if (error.request !== null) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      message = "The server didn't respond to your request. Try again later or contact us.";
    }
  }
  return message;
};
