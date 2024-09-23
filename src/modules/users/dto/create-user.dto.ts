import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUserDto {
  @ApiProperty({ example: 'Aristu Chahya', description: 'User full name' })
  fullName: string;

  @ApiProperty({ example: 'Jakarta', description: 'User address' })
  address: string;

  @ApiProperty({ example: '081234567890', description: 'User phone' })
  phone: string;
}

export const updateUserSchema = z.object({
  fullName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});
