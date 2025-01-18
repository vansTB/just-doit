import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/guard.config';

@Controller('/user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Public()
  @Post('/login')
  login(@Body() data) {
    return this.userSerivce.login(data);
  }

  @Get('/list')
  list() {
    return this.userSerivce.list();
  }

  @Post('/save')
  save(@Body() data) {
    return this.userSerivce.save(data);
  }

  @Post('/delete')
  delete(@Body() data) {
    return this.userSerivce.delete(data.id);
  }
}
