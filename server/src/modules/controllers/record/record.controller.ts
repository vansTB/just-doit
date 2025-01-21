import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('/list')
  list() {
    return this.recordService.list();
  }

  @Post('/save')
  save(@Body() data) {
    return this.recordService.save(data);
  }
}
