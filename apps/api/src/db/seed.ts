import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import UserSeeder from './seeds/user.seeder';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import UserFactory from './factories/user.factory';
import RoleFactory from './factories/role.factory';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 5432,
  username: DB_USER || 'test',
  password: DB_PASSWORD || 'test',
  database: DB_NAME || 'test',
  entities: [User, Role],
  factories: [UserFactory, RoleFactory],
  seeds: [UserSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
