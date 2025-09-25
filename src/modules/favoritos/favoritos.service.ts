import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { FilterFavoritoDto } from './dto/filter-favorito.dto';
import { Favorito } from './entities/favorito.entity';
import { Unidade } from '../unidades/entities/unidade.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private favoritosRepository: Repository<Favorito>,
    @InjectRepository(Unidade)
    private unidadesRepository: Repository<Unidade>,
  ) {}

  async create(
    createFavoritoDto: CreateFavoritoDto,
    userId: string,
  ): Promise<Favorito> {
    const { unidadeId } = createFavoritoDto;

    const unidade = await this.unidadesRepository.findOne({
      where: { id: unidadeId },
    });

    if (!unidade) {
      throw new NotFoundException('Unidade não encontrada');
    }

    const favoritoExistente = await this.favoritosRepository.findOne({
      where: { userId, unidadeId },
    });

    if (favoritoExistente) {
      throw new ConflictException('Unidade já está nos favoritos');
    }

    const favorito = this.favoritosRepository.create({
      userId,
      unidadeId,
    });

    return this.favoritosRepository.save(favorito);
  }

  async findAll(
    userId: string,
    filterDto: FilterFavoritoDto,
  ): Promise<{
    data: Favorito[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const queryBuilder = this.favoritosRepository
      .createQueryBuilder('favorito')
      .leftJoinAndSelect('favorito.unidade', 'unidade')
      .leftJoinAndSelect('unidade.empreendimento', 'empreendimento')
      .where('favorito.userId = :userId', { userId })
      .orderBy('favorito.favoritadoEm', 'DESC');

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

  async remove(unidadeId: string, userId: string): Promise<boolean> {
    const result = await this.favoritosRepository.delete({
      unidadeId,
      userId,
    });

    return (result.affected || 0) > 0;
  }
}
