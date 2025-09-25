import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { Favorito } from './entities/favorito.entity';
import { Unidade } from '../unidades/entities/unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito, Unidade])],
  controllers: [FavoritosController],
  providers: [FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
