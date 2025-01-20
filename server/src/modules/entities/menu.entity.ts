import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { RoleEntity } from './role.entity';

@Entity('just_doit_menu')
export class MenuEntity extends BaseEntity {
  @Column({ length: 100, comment: '路由名称' })
  label: string;

  @Column({ comment: '状态', default: 1 })
  status: Number;

  @Column({ comment: '权限类型，1：模块，2：页面' })
  type: Number;

  @Column({ comment: '上级ID', nullable: true })
  parent_id: Number;

  @Column({ comment: '上级名称', nullable: true })
  parent_name: string;

  @Column({ length: 100, comment: '图标', nullable: true })
  icon: string;

  @Column({ length: 100, comment: '路由访问路径', nullable: true })
  path: string;

  @Column({ length: 100, comment: '路由文件路径', nullable: true })
  page_url: string;

  @ManyToMany(() => RoleEntity, (roles) => roles.menus, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  roles: RoleEntity[];
}
