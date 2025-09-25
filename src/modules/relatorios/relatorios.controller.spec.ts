import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from './relatorios.service';
import { mockRelatoriosService } from '../../../test/mocks';

describe('RelatoriosController', () => {
  let controller: RelatoriosController;
  let relatoriosService: RelatoriosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelatoriosController],
      providers: [
        {
          provide: RelatoriosService,
          useValue: mockRelatoriosService,
        },
      ],
    }).compile();

    controller = module.get<RelatoriosController>(RelatoriosController);
    relatoriosService = module.get<RelatoriosService>(RelatoriosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /relatorios/contagem-por-status', () => {
    it('should return count of unidades by status', async () => {
      const expectedResult = [
        { status: 'disponivel', count: 10 },
        { status: 'vendido', count: 5 },
      ];

      mockRelatoriosService.getContagemPorStatus.mockResolvedValue(expectedResult);

      const result = await controller.getContagemPorStatus();

      expect(result).toEqual(expectedResult);
      expect(mockRelatoriosService.getContagemPorStatus).toHaveBeenCalled();
    });
  });

  describe('GET /relatorios/por-cidade', () => {
    it('should return report of unidades by city', async () => {
      const expectedResult = [
        { cidade: 'São Paulo', count: 8 },
        { cidade: 'Rio de Janeiro', count: 7 },
      ];

      mockRelatoriosService.getRelatorioPorCidade.mockResolvedValue(expectedResult);

      const result = await controller.getRelatorioPorCidade();

      expect(result).toEqual(expectedResult);
      expect(mockRelatoriosService.getRelatorioPorCidade).toHaveBeenCalled();
    });
  });
});