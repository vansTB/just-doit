import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('just_doit_theme')
export class ThemeEntity extends BaseEntity {
  @Column({ length: 500, comment: '主题名称' })
  name: string;

  @Column({ comment: '计时方式，1：正，2：反' })
  type: number;
}
