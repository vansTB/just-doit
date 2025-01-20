import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/modules/entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuStore: Repository<MenuEntity>,
  ) {}

  async list() {
    return await this.menuStore.find();
  }

  async save(data) {
    if (data.id) {
      await this.menuStore.save(data);
      return {
        message: '编辑成功',
      };
    } else {
      let tmpUser = new MenuEntity();
      tmpUser = Object.assign(tmpUser, data);
      await this.menuStore.save(tmpUser);
      return {
        message: '新增成功',
      };
    }
  }
}
