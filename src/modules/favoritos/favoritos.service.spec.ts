import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { Favorito } from './entities/favorito.entity';
import { Unidade } from '../unidades/entities/unidade.entity';
import { TestUtils } from '../../../test/test-utils';

describe('FavoritosService', () => {
  let service: FavoritosService;
  let favoritosRepository: any;
  let unidadesRepository: any;

  beforeEach(async () => {
    const mockFavoritosRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const mockUnidadesRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritosService,
        {
          provide: getRepositoryToken(Favorito),
          useValue: mockFavoritosRepository,
        },
        {
          provide: getRepositoryToken(Unidade),
          useValue: mockUnidadesRepository,
        },
      ],
    }).compile();

    service = module.get<FavoritosService>(FavoritosService);
    favoritosRepository = module.get(getRepositoryToken(Favorito));
    unidadesRepository = module.get(getRepositoryToken(Unidade));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new favorito', async () => {
      const createFavoritoDto = { unidadeId: '1' };
      const userId = '1';
      const mockUnidade = TestUtils.createMockUnidade();
      const mockFavorito = TestUtils.createMockFavorito();

      unidadesRepository.findOne.mockResolvedValue(mockUnidade);
      favoritosRepository.findOne.mockResolvedValue(null);
      favoritosRepository.create.mockReturnValue(mockFavorito);
      favoritosRepository.save.mockResolvedValue(mockFavorito);

      const result = await service.create(createFavoritoDto, userId);

      expect(result).toEqual(mockFavorito);
      expect(unidadesRepository.findOne).toHaveBeenCalledWith({
        where: { id: createFavoritoDto.unidadeId },
      });
      expect(favoritosRepository.findOne).toHaveBeenCalledWith({
        where: { userId, unidadeId: createFavoritoDto.unidadeId },
      });
      expect(favoritosRepository.create).toHaveBeenCalledWith({
        userId,
        unidadeId: createFavoritoDto.unidadeId,
      });
      expect(favoritosRepository.save).toHaveBeenCalledWith(mockFavorito);
    });

    it('should throw NotFoundException when unidade not found', async () => {
      const createFavoritoDto = { unidadeId: '1' };
      const userId = '1';

      unidadesRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createFavoritoDto, userId)).rejects.toThrow(
        NotFoundException,
      );
      expect(unidadesRepository.findOne).toHaveBeenCalledWith({
        where: { id: createFavoritoDto.unidadeId },
      });
    });

    it('should throw ConflictException when favorito already exists', async () => {
      const createFavoritoDto = { unidadeId: '1' };
      const userId = '1';
      const mockUnidade = TestUtils.createMockUnidade();
      const mockFavoritoExistente = TestUtils.createMockFavorito();

      unidadesRepository.findOne.mockResolvedValue(mockUnidade);
      favoritosRepository.findOne.mockResolvedValue(mockFavoritoExistente);

      await expect(service.create(createFavoritoDto, userId)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return user favorites with pagination', async () => {
      const userId = '1';
      const filterDto = { page: 1, limit: 10 };
      const mockFavoritos = [TestUtils.createMockFavorito()];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(1),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockFavoritos),
      };

      favoritosRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findAll(userId, filterDto);

      expect(result).toEqual({
        data: mockFavoritos,
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      expect(favoritosRepository.createQueryBuilder).toHaveBeenCalledWith(
        'favorito',
      );
    });

    it('should return user favorites without pagination', async () => {
      const userId = '1';
      const filterDto = {};
      const mockFavoritos = [TestUtils.createMockFavorito()];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(1),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockFavoritos),
      };

      favoritosRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findAll(userId, filterDto);

      expect(result).toEqual({
        data: mockFavoritos,
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe('remove', () => {
    it('should remove a favorito', async () => {
      const unidadeId = '1';
      const userId = '1';

      favoritosRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(unidadeId, userId);

      expect(result).toBe(true);
      expect(favoritosRepository.delete).toHaveBeenCalledWith({
        unidadeId,
        userId,
      });
    });

    it('should return false when favorito not found', async () => {
      const unidadeId = '1';
      const userId = '1';

      favoritosRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove(unidadeId, userId);

      expect(result).toBe(false);
    });
  });
});
