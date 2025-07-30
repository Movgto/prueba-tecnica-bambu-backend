import { BadRequestException, ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EncryptionAdapter, EncryptionBcryptAdapter } from './adapters';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private _logger = new ConsoleLogger('AuthService');
  private _encryptor: EncryptionAdapter = new EncryptionBcryptAdapter();

  constructor(
    private _prisma: PrismaService,
    private _jwtService: JwtService
  ) { }

  async register(signupDto: SignupDto) {
    const { password, passwordConfirmation, ...rest } = signupDto;

    const hashedPassword = this._encryptor.hash(password);

    try {
      await this._prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
          dateOfBirth: new Date(rest.dateOfBirth)
        }
      })

      this._logger.log(`A new user has been registered: ${JSON.stringify(rest)}`);
      return signupDto;
    } catch (error) {
      this.handleExceptions(error, 'register an user');
    }
  }

  async login(loginDto: LoginDto) {

    const user = await this._prisma.user.findFirst({
      where: {
        email: loginDto.email
      }
    })

    if (!user) {
      this._logger.warn(`Someone tried to sign in with an email (${loginDto.email}) that is not registered.`)
      throw new UnauthorizedException('The credentials are not valid.');
    }

    const passwordsMatch = this._encryptor.compare(loginDto.password, user.password);

    if (!passwordsMatch) {
      this._logger.warn(`Someone with the email ${loginDto.email} failed signing in with the wrong password`)
      throw new UnauthorizedException('The credentials are not valid.');
    }

    this._logger.log(`An user has signed in with email: ${loginDto.email}`);

    const { password, ...userSanitized } = user;

    const token = this._jwtService.sign({ email: userSanitized.email });

    return {
      ...userSanitized,
      token
    };
  }

  private handleExceptions(error: any, operation: string) {
    this._logger.error(`An error ocurred while trying to ${operation} - ${error}`);

    throw new InternalServerErrorException('Exception not handled, please check server logs.');
  }
}
