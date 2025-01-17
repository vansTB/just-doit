import { timeFormat } from 'src/utils/common';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ comment: '创建时间', type: 'datetime' })
  create_at: string;

  @UpdateDateColumn({ comment: '更新时间', type: 'datetime' })
  update_at: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @AfterLoad()
  async handleTimeFormatter() {
    // this.data.forEach(i=>{})
    this.create_at = timeFormat(this.create_at);
    this.update_at = timeFormat(this.update_at);
  }
}
