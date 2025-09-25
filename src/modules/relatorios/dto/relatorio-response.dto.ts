import { ApiProperty } from '@nestjs/swagger';
import { StatusUnidade } from '../../unidades/entities/unidade.entity';

export class ContagemPorStatusResponseDto {
  @ApiProperty({
    description: 'Status da unidade',
    enum: StatusUnidade,
    example: StatusUnidade.DISPONIVEL,
  })
  status: StatusUnidade;

  @ApiProperty({
    description: 'Quantidade de unidades com este status',
    example: 25,
  })
  count: number;
}

export class RelatorioPorCidadeResponseDto {
  @ApiProperty({
    description: 'Nome da cidade',
    example: 'São Paulo',
  })
  cidade: string;

  @ApiProperty({
    description: 'Quantidade total de unidades na cidade',
    example: 150,
  })
  totalUnidades: number;

  @ApiProperty({
    description: 'Quantidade de unidades disponíveis',
    example: 45,
  })
  unidadesDisponiveis: number;

  @ApiProperty({
    description: 'Quantidade de unidades reservadas',
    example: 30,
  })
  unidadesReservadas: number;

  @ApiProperty({
    description: 'Quantidade de unidades vendidas',
    example: 75,
  })
  unidadesVendidas: number;
}
