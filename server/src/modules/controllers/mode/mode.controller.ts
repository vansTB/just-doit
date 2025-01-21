import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModeService } from './mode.service';

@Controller('/mode')
export class ModeController {
  constructor(private readonly modeService: ModeService) {}

  @Get('/list')
  list() {
    return this.modeService.list();
  }

  @Post('/save')
  save(@Body() data) {
    return this.modeService.save(data);
  }
}
