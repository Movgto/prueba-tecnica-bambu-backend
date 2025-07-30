import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "generated/prisma";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const user: Omit<User, 'password'> = req.user;

    if (!user)
        throw new BadRequestException('Something went wrong, please check the server logs.')

    return user;
})