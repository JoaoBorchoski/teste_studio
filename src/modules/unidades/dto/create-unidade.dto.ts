import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsUUID,
  Min,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusUnidade } from '../entities/unidade.entity';

export class CreateUnidadeDto {
  @ApiProperty({
    description: 'ID do empreendimento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  empreendimentoId: string;

  @ApiProperty({
    description: 'Nome da torre',
    example: 'Torre A',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  torre: string;

  @ApiProperty({
    description: 'Número da unidade',
    example: '101',
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  numero: string;

  @ApiProperty({
    description: 'Área privativa em m²',
    example: 85.5,
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01)
  areaPrivativa: number;

  @ApiProperty({
    description: 'Preço da unidade',
    example: 450000.0,
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01)
  preco: number;

  @ApiProperty({
    description: 'Status da unidade',
    enum: StatusUnidade,
    example: StatusUnidade.DISPONIVEL,
  })
  @IsEnum(StatusUnidade)
  status: StatusUnidade;
}
