import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesController } from './unidades.controller';
import { UnidadesService } from './unidades.service';
import { mockUnidadesService } from '../../../test/mocks';
import { TestUtils } from '../../../test/test-utils';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { FilterUnidadeDto } from './dto/filter-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

describe('UnidadesController', () => {
  let controller: UnidadesController;
  let unidadesService: UnidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadesController],
      providers: [
        {
          provide: UnidadesService,
          useValue: mockUnidadesService,
        },
      ],
    }).compile();

    controller = module.get<UnidadesController>(UnidadesController);
    unidadesService = module.get<UnidadesService>(UnidadesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /unidades', () => {
    it('should create a new unidade', async () => {
      const createUnidadeDto = {
        numero: '101',
        andar: 1,
        preco: 100000,
        status: 'disponivel',
        empreendimentoId: '1',
        torre: 'A',
        areaPrivativa: 50,
      };

      const expectedUnidade = TestUtils.createMockUnidade();
      mockUnidadesService.create.mockResolvedValue(expectedUnidade);

      const result = await controller.create(
        createUnidadeDto as CreateUnidadeDto,
      );

      expect(result).toEqual(expectedUnidade);
      expect(mockUnidadesService.create).toHaveBeenCalledWith(createUnidadeDto);
    });
  });

  describe('GET /unidades', () => {
    it('should return all unidades when no filters provided', async () => {
      const expectedUnidades = [TestUtils.createMockUnidade()];
      mockUnidadesService.findAll.mockResolvedValue(expectedUnidades);

      const result = await controller.findAll({});

      expect(result).toEqual(expectedUnidades);
      expect(mockUnidadesService.findAll).toHaveBeenCalled();
    });

    it('should return filtered unidades when filters provided', async () => {
      const filterDto = {
        status: 'DISPONIVEL',
        precoMin: 50000,
        precoMax: 200000,
        cidade: 'São Paulo',
        empreendimentoId: '1',
        page: 1,
        limit: 10,
        orderBy: 'preco',
      };

      const expectedUnidades = [TestUtils.createMockUnidade()];
      mockUnidadesService.findWithFilters.mockResolvedValue(expectedUnidades);

      const result = await controller.findAll(filterDto as FilterUnidadeDto);

      expect(result).toEqual(expectedUnidades);
      expect(mockUnidadesService.findWithFilters).toHaveBeenCalledWith(
        filterDto,
      );
    });
  });

  describe('GET /unidades/:id', () => {
    it('should return a unidade by id', async () => {
      const unidadeId = '1';
      const expectedUnidade = TestUtils.createMockUnidade();
      mockUnidadesService.findOne.mockResolvedValue(expectedUnidade);

      const result = await controller.findOne(unidadeId);

      expect(result).toEqual(expectedUnidade);
      expect(mockUnidadesService.findOne).toHaveBeenCalledWith(unidadeId);
    });
  });

  describe('PATCH /unidades/:id', () => {
    it('should update a unidade', async () => {
      const unidadeId = '1';
      const updateUnidadeDto = {
        preco: 150000,
        status: 'vendido',
      };

      const expectedUnidade = TestUtils.createMockUnidade();
      mockUnidadesService.update.mockResolvedValue(expectedUnidade);

      const result = await controller.update(
        unidadeId,
        updateUnidadeDto as UpdateUnidadeDto,
      );

      expect(result).toEqual(expectedUnidade);
      expect(mockUnidadesService.update).toHaveBeenCalledWith(
        unidadeId,
        updateUnidadeDto,
      );
    });
  });

  describe('DELETE /unidades/:id', () => {
    it('should delete a unidade', async () => {
      const unidadeId = '1';
      const expectedResult = { message: 'Unidade deleted successfully' };
      mockUnidadesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(unidadeId);

      expect(result).toEqual(expectedResult);
      expect(mockUnidadesService.remove).toHaveBeenCalledWith(unidadeId);
    });
  });
});
