import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';

import { PrismaService } from 'src/common/service/prisma/prisma.service';
import { BcryptService } from 'src/common/service/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { fullName, username, email, password } = registerDto;

    await this.ensureUserExists(email, username);
    const hashedPassword = await this.bcrypt.hashPassword(password);

    const user = await this.createUser({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    return { status: true, message: 'Register successfully', user };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.findByUsername(username);
    await this.validatePassword(password, user.password);

    const token = this.generateToken(user.id, user.fullName, user.username);

    return { status: true, message: 'Login successfully', user, token };
  }

  //TODO: check email and username exists
  private async ensureUserExists(email: string, username: string) {
    const userWithSameEmail = await this.prisma.users.count({
      where: {
        email,
      },
    });

    if (userWithSameEmail > 0) {
      throw new BadRequestException('Email already exists');
    }

    const userWithSameUsername = await this.prisma.users.count({
      where: {
        username,
      },
    });

    if (userWithSameUsername > 0) {
      throw new BadRequestException('Username already exists');
    }
  }

  //TODO: create user
  private async createUser(register: RegisterDto) {
    const { fullName, username, email, password } = register;

    return await this.prisma.users.create({
      data: {
        fullName,
        username,
        email,
        password,
      },
      select: {
        fullName: true,
        username: true,
        email: true,
      },
    });
  }

  //TODO: generate token
  private generateToken(id: string, username: string, fullName: string) {
    const payload = {
      id,
      username,
      fullName,
    };

    return this.jwt.sign(payload);
  }

  //TODO: check username in database
  private async findByUsername(username: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  //TODO: check password
  async validatePassword(password: string, hashedPassword: string) {
    const isMatch = await this.bcrypt.comparePassword(password, hashedPassword);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  }
}
