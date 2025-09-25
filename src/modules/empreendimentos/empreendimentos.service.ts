import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpreendimentoDto } from './dto/create-empreendimento.dto';
import { UpdateEmpreendimentoDto } from './dto/update-empreendimento.dto';
import { Empreendimento } from './entities/empreendimento.entity';

@Injectable()
export class EmpreendimentosService {
  constructor(
    @InjectRepository(Empreendimento)
    private empreendimentosRepository: Repository<Empreendimento>,
  ) {}

  async create(
    createEmpreendimentoDto: CreateEmpreendimentoDto,
  ): Promise<Empreendimento> {
    const empreendimento = this.empreendimentosRepository.create(
      createEmpreendimentoDto,
    );
    return this.empreendimentosRepository.save(empreendimento);
  }

  async findAll(): Promise<Empreendimento[]> {
    return this.empreendimentosRepository.find({
      select: ['id', 'nome', 'cidade', 'uf', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(id: string): Promise<Empreendimento | undefined> {
    const empreendimento = await this.empreendimentosRepository.findOne({
      where: { id },
      select: ['id', 'nome', 'cidade', 'uf', 'createdAt', 'updatedAt'],
    });
    return empreendimento || undefined;
  }

  async update(
    id: string,
    updateEmpreendimentoDto: UpdateEmpreendimentoDto,
  ): Promise<Empreendimento | undefined> {
    await this.empreendimentosRepository.update(id, updateEmpreendimentoDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.empreendimentosRepository.delete(id);
    return (result.affected || 0) > 0;
  }
}
