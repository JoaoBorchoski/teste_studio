import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { Empreendimento } from './modules/empreendimentos/entities/empreendimento.entity';
import { Unidade } from './modules/unidades/entities/unidade.entity';
import * as dotenv from 'dotenv';
import { Favorito } from './modules/favoritos/entities/favorito.entity';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Empreendimento, Unidade, Favorito],
  migrations: ['dist/migrations/*.js'],
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
