import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpreendimentosService } from './empreendimentos.service';
import { EmpreendimentosController } from './empreendimentos.controller';
import { Empreendimento } from './entities/empreendimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empreendimento])],
  controllers: [EmpreendimentosController],
  providers: [EmpreendimentosService],
  exports: [EmpreendimentosService],
})
export class EmpreendimentosModule {}
