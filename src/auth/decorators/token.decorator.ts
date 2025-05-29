import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

export interface RequestWithToken extends Request {
  token: string;
}

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithToken>();
    if (!request.token) {
      throw new InternalServerErrorException(
        'Token not found in request context',
      );
    }

    return request.token;
  },
);
