import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userStore: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  handleService() {
    return 'handleService';
  }
  async login(data: { username: string; password }) {
    const { username } = data;
    const userItem = await this.userStore.findOne({
      where: { username },
    });
    console.log('userItem', userItem);
    if (userItem) {
      const { password, ...result } = userItem;
      if (data.password == password) {
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
}
