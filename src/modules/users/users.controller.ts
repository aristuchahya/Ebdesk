import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { UpdateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 201, description: 'Get all users successfully.' })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 201, description: 'Get user by id successfully.' })
  @ApiBearerAuth('access-token')
  @Get('byId')
  findOne(@Req() request: Request) {
    return this.usersService.findOne(request);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Update user successfully.' })
  @ApiBearerAuth('access-token')
  @Patch('update')
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(request, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 201, description: 'Delete user successfully.' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @Get('message')
  message() {
    return this.usersService.message();
  }
}
