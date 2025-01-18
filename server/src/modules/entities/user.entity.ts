import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('just_doit_user')
export class UserEntity extends BaseEntity {
  @Column({ length: 500, comment: '用户名称' })
  username: string;

  @Column({ length: 500, comment: '用户头像', nullable: true })
  avator: string;

  @Column({ length: 500, comment: '用户邮箱' })
  email: string;

  @Column({ comment: '用户角色ID' })
  role_id: Number;

  @Column({ comment: '用户角色名称', length: 500 })
  role_name: string;

  @Column({ comment: '性别 ， 1：男，2：女' })
  gender: Number;

  @Column({ comment: '用户密码', default: '123456' })
  password: string;

  @Column({ comment: '邮箱提醒状态 1/0 开/关' })
  isNotify: Number;

  @Column({ nullable: true, comment: '邮箱提醒时间', type: 'datetime' })
  notifyTime: string;
}
