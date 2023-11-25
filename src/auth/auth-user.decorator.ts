import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//이걸 통해서 request의 user를 가져올 수 있음
export const AuthUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
