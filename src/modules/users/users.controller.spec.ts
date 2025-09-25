import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { mockUsersService } from '../../../test/mocks';
import { TestUtils } from '../../../test/test-utils';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const expectedUser = TestUtils.createMockUser();
      mockUsersService.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const expectedUsers = [TestUtils.createMockUser()];
      mockUsersService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();

      expect(result).toEqual(expectedUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const expectedUser = TestUtils.createMockUser();
      mockUsersService.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(result).toEqual(expectedUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateUserDto = {
        name: 'Updated Name',
      };

      const expectedUser = TestUtils.createMockUser();
      mockUsersService.update.mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result).toEqual(expectedUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const expectedResult = { message: 'User deleted successfully' };
      mockUsersService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(userId);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.remove).toHaveBeenCalledWith(userId);
    });
  });
});