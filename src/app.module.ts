import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, CommonModule, UsersModule],
})
export class AppModule {}
