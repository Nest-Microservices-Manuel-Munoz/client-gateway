import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: any; // Replace 'any' with your actual user type
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    if (!request.user) {
      throw new InternalServerErrorException(
        'User not found in request context',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.user;
  },
);
