import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/modules/entities/menu.entity';
import { UserEntity } from 'src/modules/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userStore: Repository<UserEntity>,
    @InjectRepository(MenuEntity)
    private menuStore: Repository<MenuEntity>,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}
  handleService() {
    return 'handleService';
  }
  async login(data: { username: string; password }) {
    const { username } = data;
    const userItem = await this.userStore.findOne({
      where: { username },
    });

    if (userItem) {
      const { password, ...result } = userItem;
      if (data.password == password) {
        const menus = await this.menuStore.query(
          `select menu.* from just_doit_menu menu
            left join just_doit_role_menu rm on menu.id = rm.menu_id
            where rm.role_id = ?
          `,
          [userItem.role_id],
        );
        (result as any).menus = menus || [];
        return {
          ...result,
          access_token: await this.jwtService.signAsync(result),
        };
      }
      throw new UnauthorizedException({
        code: 401,
        message: '账号或密码错误',
      });
    }
    throw new UnauthorizedException({
      code: 401,
      message: '账号或密码错误',
    });
  }
  async list() {
    return await this.userStore.find();
  }
  async save(data) {
    if (data.id) {
      await this.userStore.save(data);
      return {
        message: '编辑成功',
      };
    } else {
      let tmpUser = new UserEntity();
      tmpUser = Object.assign(tmpUser, data);
      await this.userStore.save(tmpUser);
      return {
        message: '新增成功',
      };
    }
  }
  async delete(id) {
    await this.userStore.delete(id);
    return { message: '删除成功' };
  }
}
