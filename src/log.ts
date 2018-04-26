const noop = (args) => { return; };
export const log = (process.env.NODE_ENV !== 'production') ? console.log : noop ;
export const logError = console.error;
// export const log = funtion(){};
