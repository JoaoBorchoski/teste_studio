import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
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
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { FilterFavoritoDto } from './dto/filter-favorito.dto';
import { FavoritoResponseDto } from './dto/favorito-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Favoritos')
@ApiBearerAuth('JWT-auth')
@Controller('favoritos')
@UseGuards(JwtAuthGuard)
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar unidade aos favoritos' })
  @ApiResponse({
    status: 201,
    description: 'Unidade adicionada aos favoritos com sucesso',
    type: FavoritoResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Unidade já está nos favoritos' })
  @ApiResponse({ status: 404, description: 'Unidade não encontrada' })
  create(@Body() createFavoritoDto: CreateFavoritoDto, @Request() req) {
    return this.favoritosService.create(createFavoritoDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar favoritos do usuário' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de itens por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos retornada com sucesso',
    type: [FavoritoResponseDto],
  })
  findAll(@Request() req, @Query() filterDto: FilterFavoritoDto) {
    return this.favoritosService.findAll(req.user.id, filterDto);
  }

  @Delete(':unidadeId')
  @ApiOperation({ summary: 'Remover unidade dos favoritos' })
  @ApiParam({ name: 'unidadeId', description: 'ID da unidade' })
  @ApiResponse({
    status: 200,
    description: 'Unidade removida dos favoritos com sucesso',
  })
  remove(@Param('unidadeId') unidadeId: string, @Request() req) {
    return this.favoritosService.remove(unidadeId, req.user.id);
  }
}
