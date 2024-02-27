import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormExceptionsFilter implements ExceptionFilter {
  async catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const resFactory = (statusCode: number, message: string) => {
      return res.status(statusCode).json({
        message,
      });
    };

    if (exception.message.includes('violates foreign key constraint')) {
      return resFactory(404, 'Foreign key not found');
    }

    return res.status(500).json({
      message: exception.message,
    });
  }
}
