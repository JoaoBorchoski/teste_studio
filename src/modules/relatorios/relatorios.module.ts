import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { Unidade } from '../unidades/entities/unidade.entity';
import { Empreendimento } from '../empreendimentos/entities/empreendimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade, Empreendimento])],
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
  exports: [RelatoriosService],
})
export class RelatoriosModule {}
