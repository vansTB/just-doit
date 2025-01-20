import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/list')
  list() {
    return this.menuService.list();
  }

  @Post('/save')
  save(@Body() data) {
    return this.menuService.save(data);
  }
}
