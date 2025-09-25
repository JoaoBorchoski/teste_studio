import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusUnidade } from '../entities/unidade.entity';

export enum OrderBy {
  PRECO_ASC = 'preco_asc',
  PRECO_DESC = 'preco_desc',
}

export class FilterUnidadeDto {
  @ApiPropertyOptional({
    description: 'Filtrar por status da unidade',
    enum: StatusUnidade,
    example: StatusUnidade.DISPONIVEL,
  })
  @IsOptional()
  @IsEnum(StatusUnidade)
  status?: StatusUnidade;

  @ApiPropertyOptional({
    description: 'Preço mínimo',
    example: 300000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoMin?: number;

  @ApiPropertyOptional({
    description: 'Preço máximo',
    example: 600000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoMax?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por cidade',
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ID do empreendimento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  empreendimentoId?: string;

  @ApiPropertyOptional({
    description: 'Número da página',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Limite de itens por página',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Ordenação dos resultados',
    enum: OrderBy,
    example: OrderBy.PRECO_ASC,
    default: OrderBy.PRECO_ASC,
  })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy = OrderBy.PRECO_ASC;
}
