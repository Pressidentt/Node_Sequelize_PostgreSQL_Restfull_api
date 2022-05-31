import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from "../users.model";

export const Client = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: any = ctx.switchToHttp().getRequest();
        const user: User = request.user;
        if(data) {
            return user?.[data]
        }
        return user;
    }
)