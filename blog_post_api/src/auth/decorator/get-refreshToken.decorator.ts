import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const getRToken = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request.cookies.refresh_token;
  },
);
