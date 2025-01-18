import { Module } from '@nestjs/common';
import { RecordController } from './controllers/record/record.controller';
import { RecordService } from './controllers/record/record.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '../config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './controllers/user/user.service';
import { ENTITY } from './entities';
import { RoleController } from './controllers/role/role.controller';
import { RoleService } from './controllers/role/role.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database as TypeOrmModuleOptions),
    TypeOrmModule.forFeature(ENTITY, 'default'),
    JwtModule.register({
      global: true,
      secret: 'just_doit',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [RecordController, UserController, RoleController],
  providers: [RecordService, UserService, RoleService],
})
export class IndexModule {}
