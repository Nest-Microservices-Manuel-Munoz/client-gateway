import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const rpcError = exception.getError();
    const errorString =
      typeof rpcError === 'string' ? rpcError : JSON.stringify(rpcError);

    if (errorString.includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: errorString.substring(0, errorString.indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = rpcError.status as number;
      return response.status(status).json(rpcError as Record<string, unknown>);
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
