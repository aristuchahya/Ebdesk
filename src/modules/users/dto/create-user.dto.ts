import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Aristu Chahya', description: 'User full name' })
  fullName: string;

  @ApiProperty({ example: 'Jakarta', description: 'User address' })
  address: string;

  @ApiProperty({ example: '081234567890', description: 'User phone' })
  phone: string;
}
