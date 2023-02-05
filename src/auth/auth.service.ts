import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schemas/User.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { BCRYPT_HASH_ROUND } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async comparePasswords(
    userPassword: string,
    password: string,
  ): Promise<boolean> {
    const result = await bcrypt.compareSync(password, userPassword);
    return result;
  }
  async registerNewUser(registerUserDto: RegisterDto) {
    const hashedPass = await bcrypt.hash(
      registerUserDto.password,
      BCRYPT_HASH_ROUND,
    );
    const newUserDetails = {
      ...registerUserDto,
      password: hashedPass,
    };
    try {
      const newUser = await this.userService.createAdmin(newUserDetails);
      return newUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(user: UserDocument) {
    const payload = { username: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      user: user,
    };
  }

  async getAuthenticatedUser(email: string, hashedPassword: string) {
    const user = await this.userService.findUserByEmail(email);
    const isPasswordMatching = await this.comparePasswords(
      user.password,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
    return user;
  }
}
