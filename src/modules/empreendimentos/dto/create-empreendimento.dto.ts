import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpreendimentoDto {
  @ApiProperty({
    description: 'Nome do empreendimento',
    example: 'Residencial Jardim das Flores',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nome: string;

  @ApiProperty({
    description: 'Cidade do empreendimento',
    example: 'São Paulo',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  cidade: string;

  @ApiProperty({
    description: 'Unidade Federativa (UF)',
    example: 'SP',
    minLength: 2,
    maxLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  uf: string;
}
