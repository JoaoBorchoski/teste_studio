export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'log',
  enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'false',
  enableResponseLogging: process.env.ENABLE_RESPONSE_LOGGING !== 'false',
  enableErrorLogging: process.env.ENABLE_ERROR_LOGGING !== 'false',
  logRequestBody: process.env.LOG_REQUEST_BODY === 'true',
  logResponseBody: process.env.LOG_RESPONSE_BODY === 'true',
  logUserAgent: process.env.LOG_USER_AGENT !== 'false',
  logIP: process.env.LOG_IP !== 'false',
};
