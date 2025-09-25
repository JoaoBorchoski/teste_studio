import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RelatoriosService } from './relatorios.service';
import { Unidade } from '../unidades/entities/unidade.entity';
import { Empreendimento } from '../empreendimentos/entities/empreendimento.entity';

describe('RelatoriosService', () => {
  let service: RelatoriosService;
  let unidadesRepository: any;
  let empreendimentosRepository: any;

  beforeEach(async () => {
    const mockUnidadesRepository = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { status: 'DISPONIVEL', count: '10' },
          { status: 'VENDIDO', count: '5' },
        ]),
      }),
    };

    const mockEmpreendimentosRepository = {
      createQueryBuilder: jest.fn().mockReturnValue({
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        addGroupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { cidade: 'São Paulo', uf: 'SP', total: '8' },
          { cidade: 'Rio de Janeiro', uf: 'RJ', total: '7' },
        ]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelatoriosService,
        {
          provide: getRepositoryToken(Unidade),
          useValue: mockUnidadesRepository,
        },
        {
          provide: getRepositoryToken(Empreendimento),
          useValue: mockEmpreendimentosRepository,
        },
      ],
    }).compile();

    service = module.get<RelatoriosService>(RelatoriosService);
    unidadesRepository = module.get(getRepositoryToken(Unidade));
    empreendimentosRepository = module.get(getRepositoryToken(Empreendimento));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getContagemPorStatus', () => {
    it('should return count of unidades by status', async () => {
      const result = await service.getContagemPorStatus();

      expect(result).toEqual({
        DISPONIVEL: 10,
        RESERVADO: 0,
        VENDIDO: 5,
      });
      expect(unidadesRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('getRelatorioPorCidade', () => {
    it('should return report of unidades by city', async () => {
      const result = await service.getRelatorioPorCidade();

      expect(result).toEqual([
        { cidade: 'São Paulo', uf: 'SP', total: 8 },
        { cidade: 'Rio de Janeiro', uf: 'RJ', total: 7 },
      ]);
      expect(empreendimentosRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
