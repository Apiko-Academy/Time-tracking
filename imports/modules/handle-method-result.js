import { outputErrorHandler } from './output-errors-handler.js';
let handleMethodResult = (func) => {
    return (error, result) => {
      if (error) {
        outputErrorHandler(error);
      } else if (_.isFunction(func)) {
        func(result);
      }
    }
  };
export {  handleMethodResult };