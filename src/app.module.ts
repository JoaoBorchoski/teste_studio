import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmpreendimentosModule } from './modules/empreendimentos/empreendimentos.module';
import { UnidadesModule } from './modules/unidades/unidades.module';
import { FavoritosModule } from './modules/favoritos/favoritos.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';
import { User } from './modules/users/entities/user.entity';
import { Empreendimento } from './modules/empreendimentos/entities/empreendimento.entity';
import { Unidade } from './modules/unidades/entities/unidade.entity';
import { dataSourceOptions } from './datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    EmpreendimentosModule,
    UnidadesModule,
    FavoritosModule,
    RelatoriosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
