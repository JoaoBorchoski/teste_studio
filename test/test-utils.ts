import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from '../src/app.module';

export class TestUtils {
  static async createTestingModule(controllers: any[], providers: any[] = []) {
    return await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [],
          synchronize: true,
        }),
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
        PassportModule,
      ],
      controllers,
      providers,
    }).compile();
  }

  static createMockUser() {
    return {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createMockEmpreendimento() {
    return {
      id: '1',
      nome: 'Test Empreendimento',
      descricao: 'Test Description',
      cidade: 'Test City',
      estado: 'Test State',
      endereco: 'Test Address',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createMockUnidade() {
    return {
      id: '1',
      numero: '101',
      andar: 1,
      preco: 100000,
      status: 'disponivel',
      empreendimentoId: '1',
      empreendimento: this.createMockEmpreendimento(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createMockFavorito() {
    return {
      id: '1',
      userId: '1',
      unidadeId: '1',
      unidade: this.createMockUnidade(),
      createdAt: new Date(),
    };
  }

  static createMockJwtPayload() {
    return {
      sub: '1',
      email: 'test@example.com',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
  }

  static createMockRequest() {
    return {
      user: this.createMockUser(),
    };
  }
}
