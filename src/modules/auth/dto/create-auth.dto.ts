import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
export class RegisterDto {
  @ApiProperty({ example: 'Aristu Chahya', description: 'User full name' })
  fullName: string;

  @ApiProperty({ example: 'aristuchahya', description: 'User username' })
  username: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: '*******', description: 'User password' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'aristuchahya', description: 'User username' })
  username: string;

  @ApiProperty({ example: '******', description: 'User password' })
  password: string;
}

export const registerSchema = z.object({
  fullName: z.string().min(1, 'FullName cannot be empty').max(150),
  username: z
    .string()
    .min(1, 'Username cannot be empty')
    .max(30, 'Username cannot be longer than 30 characters'),
  email: z.string().min(1, 'Email cannot be empty').email('Email is invalid'),
  password: z
    .string()
    .min(8, 'Password at least 8 characters')
    .max(30, 'Password cannot be longer than 30 characters'),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username cannot be empty')
    .max(30, 'Username cannot be longer than 30 characters'),
  password: z
    .string()
    .min(8, 'Password at least 8 characters')
    .max(30, 'Password cannot be longer than 30 characters'),
});
