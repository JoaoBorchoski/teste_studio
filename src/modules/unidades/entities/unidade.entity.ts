import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Empreendimento } from '../../empreendimentos/entities/empreendimento.entity';

export enum StatusUnidade {
  DISPONIVEL = 'DISPONIVEL',
  RESERVADO = 'RESERVADO',
  VENDIDO = 'VENDIDO',
}

@Entity('unidades')
export class Unidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'empreendimento_id' })
  empreendimentoId: string;

  @ManyToOne(() => Empreendimento, (empreendimento) => empreendimento.unidades)
  @JoinColumn({ name: 'empreendimento_id' })
  empreendimento: Empreendimento;

  @Column()
  torre: string;

  @Column()
  numero: string;

  @Column({ name: 'area_privativa', type: 'decimal', precision: 10, scale: 2 })
  areaPrivativa: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  preco: number;

  @Column({
    type: 'enum',
    enum: StatusUnidade,
    default: StatusUnidade.DISPONIVEL,
  })
  status: StatusUnidade;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
