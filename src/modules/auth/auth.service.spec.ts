import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/common/service/prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(), // Mocking Prisma user.findUnique
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      // Mock Prisma findUnique untuk mengembalikan user
      (prismaService.users.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-id',
        fullName: 'Test User',
        username: 'testuser',
        password: 'hashed-password',
      });

      const loginDto = {
        username: 'testuser',
        password: 'password123',
      };

      const result = await authService.login(loginDto);

      expect(result).toEqual({
        status: true,
        message: 'Login successfully',
        user: expect.objectContaining({
          id: 'user-id',
          fullName: 'Test User',
          username: 'testuser',
        }),
        token: 'mock-jwt-token',
      });
    });

    it('should throw unauthorized exception if password is incorrect', async () => {
      (prismaService.users.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-id',
        fullName: 'Test User',
        username: 'testuser',
        password: 'hashed-password',
      });

      const loginDto = {
        username: 'testuser',
        password: 'wrong-password',
      };

      // Buat mock validasi password gagal
      jest.spyOn(authService, 'validatePassword').mockImplementation(() => {
        throw new UnauthorizedException('Invalid credentials');
      });

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
