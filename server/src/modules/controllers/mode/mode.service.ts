import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/modules/entities/menu.entity';
import { ModeEntity } from 'src/modules/entities/mode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModeService {
  constructor(
    @InjectRepository(ModeEntity)
    private modeService: Repository<MenuEntity>,
  ) {}

  async list() {
    return await this.modeService.find();
  }

  async save(data) {
    if (data.id) {
      await this.modeService.save(data);
      return {
        message: '编辑成功',
      };
    } else {
      let tmpUser = new MenuEntity();
      tmpUser = Object.assign(tmpUser, data);
      await this.modeService.save(tmpUser);
      return {
        message: '新增成功',
      };
    }
  }
}
