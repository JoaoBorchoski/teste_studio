import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmpreendimentosService } from './empreendimentos.service';
import { Empreendimento } from './entities/empreendimento.entity';
import { TestUtils } from '../../../test/test-utils';

describe('EmpreendimentosService', () => {
  let service: EmpreendimentosService;
  let empreendimentosRepository: any;

  beforeEach(async () => {
    const mockEmpreendimentosRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpreendimentosService,
        {
          provide: getRepositoryToken(Empreendimento),
          useValue: mockEmpreendimentosRepository,
        },
      ],
    }).compile();

    service = module.get<EmpreendimentosService>(EmpreendimentosService);
    empreendimentosRepository = module.get(getRepositoryToken(Empreendimento));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new empreendimento', async () => {
      const createEmpreendimentoDto = {
        nome: 'Test Empreendimento',
        descricao: 'Test Description',
        cidade: 'Test City',
        uf: 'Test State',
        endereco: 'Test Address',
      };

      const mockEmpreendimento = TestUtils.createMockEmpreendimento();
      empreendimentosRepository.create.mockReturnValue(mockEmpreendimento);
      empreendimentosRepository.save.mockResolvedValue(mockEmpreendimento);

      const result = await service.create(createEmpreendimentoDto);

      expect(result).toEqual(mockEmpreendimento);
      expect(empreendimentosRepository.create).toHaveBeenCalledWith(
        createEmpreendimentoDto,
      );
      expect(empreendimentosRepository.save).toHaveBeenCalledWith(
        mockEmpreendimento,
      );
    });
  });

  describe('findAll', () => {
    it('should return all empreendimentos', async () => {
      const mockEmpreendimentos = [TestUtils.createMockEmpreendimento()];
      empreendimentosRepository.find.mockResolvedValue(mockEmpreendimentos);

      const result = await service.findAll();

      expect(result).toEqual(mockEmpreendimentos);
      expect(empreendimentosRepository.find).toHaveBeenCalledWith({
        select: ['id', 'nome', 'cidade', 'uf', 'createdAt', 'updatedAt'],
      });
    });
  });

  describe('findOne', () => {
    it('should return an empreendimento by id', async () => {
      const empreendimentoId = '1';
      const mockEmpreendimento = TestUtils.createMockEmpreendimento();
      empreendimentosRepository.findOne.mockResolvedValue(mockEmpreendimento);

      const result = await service.findOne(empreendimentoId);

      expect(result).toEqual(mockEmpreendimento);
      expect(empreendimentosRepository.findOne).toHaveBeenCalledWith({
        where: { id: empreendimentoId },
        select: ['id', 'nome', 'cidade', 'uf', 'createdAt', 'updatedAt'],
      });
    });

    it('should return undefined when empreendimento not found', async () => {
      const empreendimentoId = '1';
      empreendimentosRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(empreendimentoId);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update an empreendimento', async () => {
      const empreendimentoId = '1';
      const updateEmpreendimentoDto = { nome: 'Updated Empreendimento' };
      const mockEmpreendimento = TestUtils.createMockEmpreendimento();

      empreendimentosRepository.update.mockResolvedValue({ affected: 1 });
      empreendimentosRepository.findOne.mockResolvedValue(mockEmpreendimento);

      const result = await service.update(
        empreendimentoId,
        updateEmpreendimentoDto,
      );

      expect(result).toEqual(mockEmpreendimento);
      expect(empreendimentosRepository.update).toHaveBeenCalledWith(
        empreendimentoId,
        updateEmpreendimentoDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete an empreendimento', async () => {
      const empreendimentoId = '1';
      empreendimentosRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(empreendimentoId);

      expect(result).toBe(true);
      expect(empreendimentosRepository.delete).toHaveBeenCalledWith(
        empreendimentoId,
      );
    });

    it('should return false when empreendimento not found', async () => {
      const empreendimentoId = '1';
      empreendimentosRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove(empreendimentoId);

      expect(result).toBe(false);
    });
  });
});
