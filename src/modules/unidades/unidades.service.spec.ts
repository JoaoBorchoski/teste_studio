import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnidadesService } from './unidades.service';
import { Unidade } from './entities/unidade.entity';
import { TestUtils } from '../../../test/test-utils';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { FilterUnidadeDto } from './dto/filter-unidade.dto';

describe('UnidadesService', () => {
  let service: UnidadesService;
  let unidadesRepository: any;

  beforeEach(async () => {
    const mockUnidadesRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnidadesService,
        {
          provide: getRepositoryToken(Unidade),
          useValue: mockUnidadesRepository,
        },
      ],
    }).compile();

    service = module.get<UnidadesService>(UnidadesService);
    unidadesRepository = module.get(getRepositoryToken(Unidade));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new unidade', async () => {
      const createUnidadeDto = {
        empreendimentoId: '1',
        torre: 'A',
        numero: '101',
        areaPrivativa: 50,
        preco: 100000,
        status: 'DISPONIVEL',
      };

      const mockUnidade = TestUtils.createMockUnidade();
      unidadesRepository.create.mockReturnValue(mockUnidade);
      unidadesRepository.save.mockResolvedValue(mockUnidade);

      const result = await service.create(createUnidadeDto as CreateUnidadeDto);

      expect(result).toEqual(mockUnidade);
      expect(unidadesRepository.create).toHaveBeenCalledWith(createUnidadeDto);
      expect(unidadesRepository.save).toHaveBeenCalledWith(mockUnidade);
    });
  });

  describe('findAll', () => {
    it('should return all unidades', async () => {
      const mockUnidades = [TestUtils.createMockUnidade()];
      unidadesRepository.find.mockResolvedValue(mockUnidades);

      const result = await service.findAll();

      expect(result).toEqual(mockUnidades);
      expect(unidadesRepository.find).toHaveBeenCalledWith({
        select: [
          'id',
          'empreendimentoId',
          'torre',
          'numero',
          'areaPrivativa',
          'preco',
          'status',
          'createdAt',
          'updatedAt',
        ],
        relations: ['empreendimento'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a unidade by id', async () => {
      const unidadeId = '1';
      const mockUnidade = TestUtils.createMockUnidade();
      unidadesRepository.findOne.mockResolvedValue(mockUnidade);

      const result = await service.findOne(unidadeId);

      expect(result).toEqual(mockUnidade);
      expect(unidadesRepository.findOne).toHaveBeenCalledWith({
        where: { id: unidadeId },
        select: [
          'id',
          'empreendimentoId',
          'torre',
          'numero',
          'areaPrivativa',
          'preco',
          'status',
          'createdAt',
          'updatedAt',
        ],
        relations: ['empreendimento'],
      });
    });

    it('should return undefined when unidade not found', async () => {
      const unidadeId = '1';
      unidadesRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(unidadeId);

      expect(result).toBeUndefined();
    });
  });

  describe('findByEmpreendimento', () => {
    it('should return unidades by empreendimento', async () => {
      const empreendimentoId = '1';
      const mockUnidades = [TestUtils.createMockUnidade()];
      unidadesRepository.find.mockResolvedValue(mockUnidades);

      const result = await service.findByEmpreendimento(empreendimentoId);

      expect(result).toEqual(mockUnidades);
      expect(unidadesRepository.find).toHaveBeenCalledWith({
        where: { empreendimentoId },
        select: [
          'id',
          'empreendimentoId',
          'torre',
          'numero',
          'areaPrivativa',
          'preco',
          'status',
          'createdAt',
          'updatedAt',
        ],
        relations: ['empreendimento'],
      });
    });
  });

  describe('findWithFilters', () => {
    it('should return filtered unidades with pagination', async () => {
      const filterDto = {
        status: 'DISPONIVEL',
        precoMin: 50000,
        precoMax: 200000,
        cidade: 'São Paulo',
        empreendimentoId: '1',
        page: 1,
        limit: 10,
        orderBy: 'preco' as any,
      };

      const mockUnidade = TestUtils.createMockUnidade();
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(5),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockUnidade]),
      };

      unidadesRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findWithFilters(
        filterDto as FilterUnidadeDto,
      );

      expect(result).toEqual({
        data: [mockUnidade],
        total: 5,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      expect(unidadesRepository.createQueryBuilder).toHaveBeenCalledWith(
        'unidade',
      );
    });
  });

  describe('update', () => {
    it('should update a unidade', async () => {
      const unidadeId = '1';
      const updateUnidadeDto = { preco: 150000 };
      const mockUnidade = TestUtils.createMockUnidade();

      unidadesRepository.update.mockResolvedValue({ affected: 1 });
      unidadesRepository.findOne.mockResolvedValue(mockUnidade);

      const result = await service.update(unidadeId, updateUnidadeDto);

      expect(result).toEqual(mockUnidade);
      expect(unidadesRepository.update).toHaveBeenCalledWith(
        unidadeId,
        updateUnidadeDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete a unidade', async () => {
      const unidadeId = '1';
      unidadesRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(unidadeId);

      expect(result).toBe(true);
      expect(unidadesRepository.delete).toHaveBeenCalledWith(unidadeId);
    });

    it('should return false when unidade not found', async () => {
      const unidadeId = '1';
      unidadesRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove(unidadeId);

      expect(result).toBe(false);
    });
  });
});
