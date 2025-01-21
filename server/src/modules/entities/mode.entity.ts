import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('just_doit_mode')
export class ModeEntity extends BaseEntity {
  @Column({ length: 500, comment: '主题名称' })
  name: string;

  @Column({ comment: '计时方式，1：正，2：反,3:不计时' })
  type: number;

  @Column({ comment: '计时分钟', length: 500, nullable: true })
  time: string;
}
