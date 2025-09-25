import { ApiProperty } from '@nestjs/swagger';

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
