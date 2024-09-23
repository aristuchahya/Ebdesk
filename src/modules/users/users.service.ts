import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/common/service/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.users.findMany({
      select: {
        fullName: true,
        username: true,
        email: true,
        address: true,
        phone: true,
      },
    });
  }

  async findOne(request: Request) {
    const user = request['user'] as { id: string };
    const { id } = user;
    const userId = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        fullName: true,
        username: true,
        email: true,
        address: true,
        phone: true,
      },
    });

    return {
      status: true,
      message: 'Get user successfully',
      userId,
    };
  }

  async update(request: Request, updateUserDto: UpdateUserDto) {
    const user = request['user'] as { id: string };
    const { id } = user;

    if (!user) throw new UnauthorizedException('Unauthorized user');
    const updatedUser = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        fullName: updateUserDto.fullName,
        address: updateUserDto.address,
        phone: updateUserDto.phone,
      },
    });

    return {
      status: true,
      message: 'Update successfully',
      data: updatedUser,
    };
  }

  message() {
    return 'Welcome to PT Ebdesk API';
  }
}
