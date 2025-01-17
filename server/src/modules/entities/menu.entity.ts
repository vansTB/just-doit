import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('just_doit_menu')
export class MenuEntity extends BaseEntity {
  @Column({ length: 100, comment: '路由名称' })
  label: string;

  @Column({ length: 100, comment: '权限类型，1：模块，2：页面' })
  type: string;

  @Column({ comment: '上级ID' })
  parentId: Number;

  @Column({ length: 100, comment: '图标' })
  icon: string;
  @Column({ length: 100, comment: '路由访问路径' })
  path: string;

  @Column({ length: 100, comment: '路由文件路径' })
  pageUrl: string;
}
