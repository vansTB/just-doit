import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('just_doit_record')
export class RecordEntity extends BaseEntity {
  @Column({ comment: '记录状态，1：已完成，0：未完成' })
  status: Number;

  @Column({ comment: '模式ID' })
  modeId: Number;

  @Column({ length: 100, comment: '持续时间' })
  duringTime: string;
}
