import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleSerivce: RoleService) {}

  @Get('/list')
  list() {
    return this.roleSerivce.list();
  }
}
