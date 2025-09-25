import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UnidadesService } from './unidades.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { FilterUnidadeDto } from './dto/filter-unidade.dto';
import { UnidadeResponseDto } from './dto/unidade-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Unidades')
@ApiBearerAuth('JWT-auth')
@Controller('unidades')
@UseGuards(JwtAuthGuard)
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova unidade' })
  @ApiResponse({
    status: 201,
    description: 'Unidade criada com sucesso',
    type: UnidadeResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createUnidadeDto: CreateUnidadeDto) {
    return this.unidadesService.create(createUnidadeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar unidades com filtros opcionais' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por status',
  })
  @ApiQuery({ name: 'precoMin', required: false, description: 'Preço mínimo' })
  @ApiQuery({ name: 'precoMax', required: false, description: 'Preço máximo' })
  @ApiQuery({
    name: 'cidade',
    required: false,
    description: 'Filtrar por cidade',
  })
  @ApiQuery({
    name: 'empreendimentoId',
    required: false,
    description: 'ID do empreendimento',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de itens por página',
  })
  @ApiQuery({ name: 'orderBy', required: false, description: 'Ordenação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de unidades retornada com sucesso',
    type: [UnidadeResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll(@Query() filterDto: FilterUnidadeDto) {
    const hasFilters = Object.keys(filterDto).some(
      (key) => filterDto[key] !== undefined,
    );

    if (hasFilters) {
      return this.unidadesService.findWithFilters(filterDto);
    }

    return this.unidadesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar unidade por ID' })
  @ApiParam({ name: 'id', description: 'ID da unidade' })
  @ApiResponse({
    status: 200,
    description: 'Unidade encontrada com sucesso',
    type: UnidadeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Unidade não encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findOne(@Param('id') id: string) {
    return this.unidadesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar unidade' })
  @ApiParam({ name: 'id', description: 'ID da unidade' })
  @ApiResponse({
    status: 200,
    description: 'Unidade atualizada com sucesso',
    type: UnidadeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Unidade não encontrada' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto) {
    return this.unidadesService.update(id, updateUnidadeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover unidade' })
  @ApiParam({ name: 'id', description: 'ID da unidade' })
  @ApiResponse({
    status: 200,
    description: 'Unidade removida com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Unidade não encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  remove(@Param('id') id: string) {
    return this.unidadesService.remove(id);
  }
}
