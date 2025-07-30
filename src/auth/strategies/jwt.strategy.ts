import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtSecretRequestType } from "@nestjs/jwt";
import { PrismaService } from "src/common/prisma/prisma.service";
import { User } from "generated/prisma";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private _configService: ConfigService,
        private _prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get('JWT_SECRET')!,
        })
    }

    async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
        const user = await this._prisma.user.findFirst({
            where: { email: payload.email },
            omit: { password: true }
        });

        if (!user)
            throw new UnauthorizedException('The credentials are not valid.');

        return user;
    }
}