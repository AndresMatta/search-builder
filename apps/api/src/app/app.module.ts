import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../ormconfig';
import { UserModule } from '../users/user.module';
import { RoleModule } from '../roles/role.module';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [User, Role],
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
