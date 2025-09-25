import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Unidade } from '../../unidades/entities/unidade.entity';

@Entity('empreendimentos')
export class Empreendimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @OneToMany(() => Unidade, (unidade) => unidade.empreendimento)
  unidades: Unidade[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
