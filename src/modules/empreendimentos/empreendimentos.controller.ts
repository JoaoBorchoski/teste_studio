import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { EmpreendimentosService } from './empreendimentos.service';
import { CreateEmpreendimentoDto } from './dto/create-empreendimento.dto';
import { UpdateEmpreendimentoDto } from './dto/update-empreendimento.dto';
import { EmpreendimentoResponseDto } from './dto/empreendimento-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Empreendimentos')
@ApiBearerAuth('JWT-auth')
@Controller('empreendimentos')
@UseGuards(JwtAuthGuard)
export class EmpreendimentosController {
  constructor(
    private readonly empreendimentosService: EmpreendimentosService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo empreendimento' })
  @ApiResponse({
    status: 201,
    description: 'Empreendimento criado com sucesso',
    type: EmpreendimentoResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createEmpreendimentoDto: CreateEmpreendimentoDto) {
    return this.empreendimentosService.create(createEmpreendimentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os empreendimentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empreendimentos retornada com sucesso',
    type: [EmpreendimentoResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll() {
    return this.empreendimentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar empreendimento por ID' })
  @ApiParam({ name: 'id', description: 'ID do empreendimento' })
  @ApiResponse({
    status: 200,
    description: 'Empreendimento encontrado com sucesso',
    type: EmpreendimentoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Empreendimento não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findOne(@Param('id') id: string) {
    return this.empreendimentosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar empreendimento' })
  @ApiParam({ name: 'id', description: 'ID do empreendimento' })
  @ApiResponse({
    status: 200,
    description: 'Empreendimento atualizado com sucesso',
    type: EmpreendimentoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Empreendimento não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateEmpreendimentoDto: UpdateEmpreendimentoDto,
  ) {
    return this.empreendimentosService.update(id, updateEmpreendimentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover empreendimento' })
  @ApiParam({ name: 'id', description: 'ID do empreendimento' })
  @ApiResponse({
    status: 200,
    description: 'Empreendimento removido com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Empreendimento não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  remove(@Param('id') id: string) {
    return this.empreendimentosService.remove(id);
  }
}
