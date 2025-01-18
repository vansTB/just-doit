import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { MenuEntity } from './menu.entity';

@Entity('just_doit_role')
export class RoleEntity extends BaseEntity {
  @Column({ length: 500, comment: '用户名称' })
  name: string;

  @Column({ default: 1, comment: '状态 1启用 0禁用' })
  status: number;

  @ManyToMany(() => MenuEntity, (menus) => menus.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'just_doit_role_menu', // 此关系的联结表的表名
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'menu_id',
      referencedColumnName: 'id',
    },
  })

  // @ManyToMany(() => AuthEntity, auths => auths.roles)
  // @JoinTable()
  menus?: MenuEntity[];
}
