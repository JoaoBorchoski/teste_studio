import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TestUtils } from '../../../test/test-utils';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: any;

  beforeEach(async () => {
    const mockUsersRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword',
      };

      const mockUser = TestUtils.createMockUser();
      usersRepository.create.mockReturnValue(mockUser);
      usersRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(usersRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(usersRepository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [TestUtils.createMockUser()];
      usersRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(usersRepository.find).toHaveBeenCalledWith({
        select: ['id', 'email', 'name', 'createdAt', 'updatedAt'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const mockUser = TestUtils.createMockUser();
      usersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(userId);

      expect(result).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        select: ['id', 'email', 'name', 'createdAt', 'updatedAt'],
      });
    });

    it('should return undefined when user not found', async () => {
      const userId = '1';
      usersRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(userId);

      expect(result).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const mockUser = TestUtils.createMockUser();
      usersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(result).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return undefined when user not found', async () => {
      const email = 'test@example.com';
      usersRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail(email);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateUserDto = { name: 'Updated Name' };
      const mockUser = TestUtils.createMockUser();

      usersRepository.update.mockResolvedValue({ affected: 1 });
      usersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.update(userId, updateUserDto);

      expect(result).toEqual(mockUser);
      expect(usersRepository.update).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userId = '1';
      usersRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(userId);

      expect(result).toBe(true);
      expect(usersRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should return false when user not found', async () => {
      const userId = '1';
      usersRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove(userId);

      expect(result).toBe(false);
    });
  });
});
