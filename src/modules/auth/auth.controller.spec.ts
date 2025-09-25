import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { mockAuthService } from '../../../test/mocks';
import { TestUtils } from '../../../test/test-utils';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const expectedResult = {
        user: TestUtils.createMockUser(),
        access_token: 'mock-jwt-token',
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(createUserDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('POST /auth/login', () => {
    it('should login user and return token', async () => {
      const loginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        user: TestUtils.createMockUser(),
        access_token: 'mock-jwt-token',
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginUserDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });

  describe('GET /auth/me', () => {
    it('should return user profile', async () => {
      const mockRequest = TestUtils.createMockRequest();
      const expectedUser = TestUtils.createMockUser();

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual(expectedUser);
    });
  });
});

