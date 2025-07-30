import { ArgumentMetadata, BadRequestException, ConsoleLogger, Injectable, PipeTransform } from '@nestjs/common';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class PasswordConfirmationPipe implements PipeTransform {
  private _logger = new ConsoleLogger('PasswordConfirmationPipe');

  transform(value: SignupDto, metadata: ArgumentMetadata) {

    if (value.password !== value.passwordConfirmation) {
      this._logger.error('An user tried to register but the passwords provided did not match');
      throw new BadRequestException('The passwords don\'t match');
    }

    return value;
  }
}
