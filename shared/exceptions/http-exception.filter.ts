import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

@Catch(NotFoundException, BadRequestException, ConflictException)
export class HttpExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

    return res.status(status).json({
      message: exception.message,
    });
  }
}
