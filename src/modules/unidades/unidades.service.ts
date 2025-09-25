import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { FilterUnidadeDto, OrderBy } from './dto/filter-unidade.dto';
import { Unidade } from './entities/unidade.entity';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectRepository(Unidade)
    private unidadesRepository: Repository<Unidade>,
  ) {}

  async create(createUnidadeDto: CreateUnidadeDto): Promise<Unidade> {
    const unidade = this.unidadesRepository.create(createUnidadeDto);
    return this.unidadesRepository.save(unidade);
  }

  async findAll(): Promise<Unidade[]> {
    return this.unidadesRepository.find({
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
  }

  async findOne(id: string): Promise<Unidade | undefined> {
    const unidade = await this.unidadesRepository.findOne({
      where: { id },
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
    return unidade || undefined;
  }

  async findByEmpreendimento(empreendimentoId: string): Promise<Unidade[]> {
    return this.unidadesRepository.find({
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
  }

  async findWithFilters(filterDto: FilterUnidadeDto): Promise<{
    data: Unidade[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const queryBuilder = this.unidadesRepository
      .createQueryBuilder('unidade')
      .leftJoinAndSelect('unidade.empreendimento', 'empreendimento')
      .select([
        'unidade.id',
        'unidade.empreendimentoId',
        'unidade.torre',
        'unidade.numero',
        'unidade.areaPrivativa',
        'unidade.preco',
        'unidade.status',
        'unidade.createdAt',
        'unidade.updatedAt',
        'empreendimento.id',
        'empreendimento.nome',
        'empreendimento.cidade',
        'empreendimento.uf',
      ]);

    if (filterDto.status) {
      queryBuilder.andWhere('unidade.status = :status', {
        status: filterDto.status,
      });
    }

    if (filterDto.precoMin !== undefined) {
      queryBuilder.andWhere('unidade.preco >= :precoMin', {
        precoMin: filterDto.precoMin,
      });
    }

    if (filterDto.precoMax !== undefined) {
      queryBuilder.andWhere('unidade.preco <= :precoMax', {
        precoMax: filterDto.precoMax,
      });
    }

    if (filterDto.cidade) {
      queryBuilder.andWhere('empreendimento.cidade ILIKE :cidade', {
        cidade: `%${filterDto.cidade}%`,
      });
    }

    if (filterDto.empreendimentoId) {
      queryBuilder.andWhere('unidade.empreendimentoId = :empreendimentoId', {
        empreendimentoId: filterDto.empreendimentoId,
      });
    }

    if (filterDto.orderBy === OrderBy.PRECO_DESC) {
      queryBuilder.orderBy('unidade.preco', 'DESC');
    } else {
      queryBuilder.orderBy('unidade.preco', 'ASC');
    }

    const total = await queryBuilder.getCount();

    const page = filterDto.page || 1;
    const limit = filterDto.limit || 10;
    const skip = (page - 1) * limit;

    queryBuilder.skip(skip).take(limit);

    const data = await queryBuilder.getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    updateUnidadeDto: UpdateUnidadeDto,
  ): Promise<Unidade | undefined> {
    await this.unidadesRepository.update(id, updateUnidadeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.unidadesRepository.delete(id);
    return (result.affected || 0) > 0;
  }
}
