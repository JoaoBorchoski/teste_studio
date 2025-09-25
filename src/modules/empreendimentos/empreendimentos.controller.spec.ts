import { Test, TestingModule } from '@nestjs/testing';
import { EmpreendimentosController } from './empreendimentos.controller';
import { EmpreendimentosService } from './empreendimentos.service';
import { mockEmpreendimentosService } from '../../../test/mocks';
import { TestUtils } from '../../../test/test-utils';
import { UpdateEmpreendimentoDto } from './dto/update-empreendimento.dto';

describe('EmpreendimentosController', () => {
  let controller: EmpreendimentosController;
  let empreendimentosService: EmpreendimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpreendimentosController],
      providers: [
        {
          provide: EmpreendimentosService,
          useValue: mockEmpreendimentosService,
        },
      ],
    }).compile();

    controller = module.get<EmpreendimentosController>(
      EmpreendimentosController,
    );
    empreendimentosService = module.get<EmpreendimentosService>(
      EmpreendimentosService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /empreendimentos', () => {
    it('should create a new empreendimento', async () => {
      const createEmpreendimentoDto = {
        nome: 'Test Empreendimento',
        descricao: 'Test Description',
        cidade: 'Test City',
        uf: 'Test State',
      };

      const expectedEmpreendimento = TestUtils.createMockEmpreendimento();
      mockEmpreendimentosService.create.mockResolvedValue(
        expectedEmpreendimento,
      );

      const result = await controller.create(createEmpreendimentoDto);

      expect(result).toEqual(expectedEmpreendimento);
      expect(mockEmpreendimentosService.create).toHaveBeenCalledWith(
        createEmpreendimentoDto,
      );
    });
  });

  describe('GET /empreendimentos', () => {
    it('should return all empreendimentos', async () => {
      const expectedEmpreendimentos = [TestUtils.createMockEmpreendimento()];
      mockEmpreendimentosService.findAll.mockResolvedValue(
        expectedEmpreendimentos,
      );

      const result = await controller.findAll();

      expect(result).toEqual(expectedEmpreendimentos);
      expect(mockEmpreendimentosService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /empreendimentos/:id', () => {
    it('should return an empreendimento by id', async () => {
      const empreendimentoId = '1';
      const expectedEmpreendimento = TestUtils.createMockEmpreendimento();
      mockEmpreendimentosService.findOne.mockResolvedValue(
        expectedEmpreendimento,
      );

      const result = await controller.findOne(empreendimentoId);

      expect(result).toEqual(expectedEmpreendimento);
      expect(mockEmpreendimentosService.findOne).toHaveBeenCalledWith(
        empreendimentoId,
      );
    });
  });

  describe('PATCH /empreendimentos/:id', () => {
    it('should update an empreendimento', async () => {
      const empreendimentoId = '1';
      const updateEmpreendimentoDto = {
        nome: 'Updated Empreendimento',
      };

      const expectedEmpreendimento = TestUtils.createMockEmpreendimento();
      mockEmpreendimentosService.update.mockResolvedValue(
        expectedEmpreendimento,
      );

      const result = await controller.update(
        empreendimentoId,
        updateEmpreendimentoDto as UpdateEmpreendimentoDto,
      );

      expect(result).toEqual(expectedEmpreendimento);
      expect(mockEmpreendimentosService.update).toHaveBeenCalledWith(
        empreendimentoId,
        updateEmpreendimentoDto as UpdateEmpreendimentoDto,
      );
    });
  });

  describe('DELETE /empreendimentos/:id', () => {
    it('should delete an empreendimento', async () => {
      const empreendimentoId = '1';
      const expectedResult = { message: 'Empreendimento deleted successfully' };
      mockEmpreendimentosService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(empreendimentoId as string);

      expect(result).toEqual(expectedResult);
      expect(mockEmpreendimentosService.remove).toHaveBeenCalledWith(
        empreendimentoId,
      );
    });
  });
});
