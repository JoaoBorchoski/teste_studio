import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade, StatusUnidade } from '../unidades/entities/unidade.entity';
import { Empreendimento } from '../empreendimentos/entities/empreendimento.entity';

@Injectable()
export class RelatoriosService {
  constructor(
    @InjectRepository(Unidade)
    private unidadesRepository: Repository<Unidade>,
    @InjectRepository(Empreendimento)
    private empreendimentosRepository: Repository<Empreendimento>,
  ) {}

  async getContagemPorStatus(): Promise<{
    DISPONIVEL: number;
    RESERVADO: number;
    VENDIDO: number;
  }> {
    const result = await this.unidadesRepository
      .createQueryBuilder('unidade')
      .select('unidade.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('unidade.status')
      .getRawMany();

    const contagem = {
      DISPONIVEL: 0,
      RESERVADO: 0,
      VENDIDO: 0,
    };

    result.forEach((item) => {
      contagem[item.status] = parseInt(item.count);
    });

    return contagem;
  }

  async getRelatorioPorCidade(): Promise<
    Array<{ cidade: string; uf: string; total: number }>
  > {
    const result = await this.empreendimentosRepository
      .createQueryBuilder('empreendimento')
      .leftJoin('empreendimento.unidades', 'unidade')
      .select('empreendimento.cidade', 'cidade')
      .addSelect('empreendimento.uf', 'uf')
      .addSelect('COUNT(unidade.id)', 'total')
      .groupBy('empreendimento.cidade')
      .addGroupBy('empreendimento.uf')
      .orderBy('total', 'DESC')
      .getRawMany();

    return result.map((item) => ({
      cidade: item.cidade,
      uf: item.uf,
      total: parseInt(item.total),
    }));
  }
}
