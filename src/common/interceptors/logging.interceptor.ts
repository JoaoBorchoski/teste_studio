import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { loggerConfig } from '../config/logger.config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (!loggerConfig.enableRequestLogging) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const ip = request.ip || request.connection.remoteAddress;

    const startTime = Date.now();

    let logMessage = `Incoming Request: ${method} ${url}`;

    if (loggerConfig.logIP) {
      logMessage += ` - IP: ${ip}`;
    }

    if (loggerConfig.logUserAgent) {
      logMessage += ` - User-Agent: ${userAgent}`;
    }

    this.logger.log(logMessage);

    if (loggerConfig.logRequestBody && Object.keys(body).length > 0) {
      this.logger.debug(`Request Body: ${JSON.stringify(body)}`);
    }

    if (Object.keys(query).length > 0) {
      this.logger.debug(`Query Params: ${JSON.stringify(query)}`);
    }

    if (Object.keys(params).length > 0) {
      this.logger.debug(`Route Params: ${JSON.stringify(params)}`);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          if (!loggerConfig.enableResponseLogging) {
            return;
          }

          const endTime = Date.now();
          const duration = endTime - startTime;
          const statusCode = response.statusCode;

          const contentLength = response.get('content-length') || 0;
          this.logger.log(
            `Outgoing Response: ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - Size: ${contentLength} bytes`,
          );

          if (
            loggerConfig.logResponseBody &&
            process.env.NODE_ENV === 'development'
          ) {
            this.logger.debug(`Response Data: ${JSON.stringify(data)}`);
          }
        },
        error: (error) => {
          if (!loggerConfig.enableErrorLogging) {
            return;
          }

          const endTime = Date.now();
          const duration = endTime - startTime;
          const statusCode = error.status || 500;

          this.logger.error(
            `Request Error: ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - Error: ${error.message}`,
          );

          if (process.env.NODE_ENV === 'development') {
            this.logger.error(`Error Stack: ${error.stack}`);
          }
        },
      }),
    );
  }
}
