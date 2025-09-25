import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TestUtils } from '../../../test/test-utils';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: any;
  let jwtService: any;

  beforeEach(async () => {
    const mockUsersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const mockUser = TestUtils.createMockUser();
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.register(createUserDto);

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        access_token: 'mock-jwt-token',
      });
      expect(usersService.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(usersService.create).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const existingUser = TestUtils.createMockUser();
      usersService.findByEmail.mockResolvedValue(existingUser);

      await expect(service.register(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = TestUtils.createMockUser();
      usersService.findByEmail.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.login(loginUserDto);

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        access_token: 'mock-jwt-token',
      });
      expect(usersService.findByEmail).toHaveBeenCalledWith(loginUserDto.email);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      const loginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      usersService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findByEmail).toHaveBeenCalledWith(loginUserDto.email);
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const loginUserDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const mockUser = TestUtils.createMockUser();
      usersService.findByEmail.mockResolvedValue(mockUser);

      const bcrypt = require('bcryptjs');
      bcrypt.compare.mockResolvedValue(false);

      await expect(service.login(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user when credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockUser = TestUtils.createMockUser();

      usersService.findByEmail.mockResolvedValue(mockUser);

      const bcrypt = require('bcryptjs');
      bcrypt.compare.mockResolvedValue(true);

      const result = await service.validateUser(email, password);

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null when user not found', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      usersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const mockUser = TestUtils.createMockUser();

      usersService.findByEmail.mockResolvedValue(mockUser);

      const bcrypt = require('bcryptjs');
      bcrypt.compare.mockResolvedValue(false);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
    });
  });
});
