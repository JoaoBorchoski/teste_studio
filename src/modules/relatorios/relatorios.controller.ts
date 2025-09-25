import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RelatoriosService } from './relatorios.service';
import {
  ContagemPorStatusResponseDto,
  RelatorioPorCidadeResponseDto,
} from './dto/relatorio-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Relatórios')
@ApiBearerAuth('JWT-auth')
@Controller('relatorios')
@UseGuards(JwtAuthGuard)
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('contagem-por-status')
  @ApiOperation({ summary: 'Obter contagem de unidades por status' })
  @ApiResponse({
    status: 200,
    description: 'Contagem de unidades por status retornada com sucesso',
    type: [ContagemPorStatusResponseDto],
  })
  getContagemPorStatus() {
    return this.relatoriosService.getContagemPorStatus();
  }

  @Get('por-cidade')
  @ApiOperation({ summary: 'Obter relatório de unidades por cidade' })
  @ApiResponse({
    status: 200,
    description: 'Relatório de unidades por cidade retornado com sucesso',
    type: [RelatorioPorCidadeResponseDto],
  })
  getRelatorioPorCidade() {
    return this.relatoriosService.getRelatorioPorCidade();
  }
}
