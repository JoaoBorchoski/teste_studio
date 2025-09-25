import { ApiProperty } from '@nestjs/swagger';
import { StatusUnidade } from '../entities/unidade.entity';

export class EmpreendimentoResponseDto {
  @ApiProperty({
    description: 'ID do empreendimento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do empreendimento',
    example: 'Residencial Jardim das Flores',
  })
  nome: string;

  @ApiProperty({
    description: 'Cidade do empreendimento',
    example: 'São Paulo',
  })
  cidade: string;

  @ApiProperty({
    description: 'Unidade Federativa (UF)',
    example: 'SP',
  })
  uf: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}

export class UnidadeResponseDto {
  @ApiProperty({
    description: 'ID da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do empreendimento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  empreendimentoId: string;

  @ApiProperty({
    description: 'Dados do empreendimento',
    type: EmpreendimentoResponseDto,
  })
  empreendimento: EmpreendimentoResponseDto;

  @ApiProperty({
    description: 'Nome da torre',
    example: 'Torre A',
  })
  torre: string;

  @ApiProperty({
    description: 'Número da unidade',
    example: '101',
  })
  numero: string;

  @ApiProperty({
    description: 'Área privativa em m²',
    example: 85.5,
  })
  areaPrivativa: number;

  @ApiProperty({
    description: 'Preço da unidade',
    example: 450000.0,
  })
  preco: number;

  @ApiProperty({
    description: 'Status da unidade',
    enum: StatusUnidade,
    example: StatusUnidade.DISPONIVEL,
  })
  status: StatusUnidade;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}
