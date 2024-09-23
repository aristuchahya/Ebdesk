import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma/prisma.service';
import { BcryptService } from './service/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ZodFilter } from './filter/zod-filter/zod.filter';
import { AuthGuard } from './guard/auth/auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    PrismaService,
    BcryptService,
    {
      provide: APP_FILTER,
      useClass: ZodFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaService, JwtModule, BcryptService],
})
export class CommonModule {}
