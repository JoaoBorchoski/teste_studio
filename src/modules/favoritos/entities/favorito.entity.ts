import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Unidade } from '../../unidades/entities/unidade.entity';

@Entity('favoritos')
@Unique(['userId', 'unidadeId'])
export class Favorito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'unidade_id' })
  unidadeId: string;

  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'unidade_id' })
  unidade: Unidade;

  @CreateDateColumn({ name: 'favoritado_em' })
  favoritadoEm: Date;
}
