import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleSerivce: RoleService) {}

  @Get('/list')
  list() {
    return this.roleSerivce.list();
  }

  @Post('/save')
  save(@Body() data) {
    return this.roleSerivce.save(data);
  }

  @Post('/delete')
  delete(@Body() data) {
    return this.roleSerivce.delete(data.id);
  }
}
