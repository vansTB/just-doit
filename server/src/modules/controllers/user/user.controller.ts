import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
