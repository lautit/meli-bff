import pino from 'pino';

const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

function interceptorRequest(config) {
  const { url, method, data } = config;

  l.debug(`[Axios Request] ${method.toUpperCase()} ${url} ${JSON.stringify(data)}`);
  return config;
}
function interceptorResponse(response) {
  const {
    config, status, statusText, data,
  } = response;

  l.debug(
    `[Axios Response] ${config.method.toUpperCase()} ${status}:${statusText} ${
      config.url
    } ${JSON.stringify(data)}`,
  );
  return response;
}
function interceptorError(error) {
  const { config, status, statusText } = error.response;

  l.error(`[Axios Error] ${config.method.toUpperCase()} ${config.url} ${status}:${statusText}`);
  return Promise.reject(error);
}

export default l;

export {
  l, interceptorError, interceptorRequest, interceptorResponse,
};
