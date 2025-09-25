import { ApiProperty } from '@nestjs/swagger';
import { UnidadeResponseDto } from '../../unidades/dto/unidade-response.dto';

export class FavoritoResponseDto {
  @ApiProperty({
    description: 'ID do favorito',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'ID da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  unidadeId: string;

  @ApiProperty({
    description: 'Dados da unidade favoritada',
    type: UnidadeResponseDto,
  })
  unidade: UnidadeResponseDto;

  @ApiProperty({
    description: 'Data em que foi favoritado',
    example: '2024-01-15T10:30:00.000Z',
  })
  favoritadoEm: Date;
}
