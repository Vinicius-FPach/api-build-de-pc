import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { CustomException } from './custom-exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(exception.getStatus()).json({
      success: false,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
