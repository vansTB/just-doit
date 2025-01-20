import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/modules/entities/menu.entity';
import { RoleEntity } from 'src/modules/entities/role.entity';
import { UserEntity } from 'src/modules/entities/user.entity';
import { DataSource, getConnection, In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleStore: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    private menuStore: Repository<MenuEntity>,
    private dataSource: DataSource,
  ) {}

  async list() {
    return await this.roleStore.find({
      relations: {
        menus: true,
      },
    });
  }

  async delete(id) {
    await this.roleStore.delete(id);
    return { message: '删除成功' };
  }

  async save(data) {
    if (data.menuIds.length) {
      const menus = await this.menuStore.find({
        where: {
          id: In(data.menuIds),
        },
      });
      data.menus = menus;
    }

    console.log('------', data);

    let tmpRole = new RoleEntity();
    tmpRole = Object.assign(tmpRole, data);
    await this.dataSource.manager.save(tmpRole);

    if (data.id) {
      return {
        message: '编辑成功',
      };
    } else {
      return {
        message: '新增成功',
      };
    }
  }
  // async save(body) {
  //   try {
  //     let roleBody = new RoleEntity();
  //     roleBody = Object.assign(roleBody, body);
  //     const roleEffectData = await this.roleStore.save(roleBody);
  //     if (roleEffectData.id) {
  //       await this.dataSource.manager.save(roleBody)

  //       return {
  //         message: body.id ? '修改成功' : '新增成功',
  //       };
  //     }
  //   } catch (error) {
  //     console.log('err', error);
  //     return {
  //       msg: '失败',
  //     };
  //   }
  // }
}
