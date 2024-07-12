import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import { Role } from '../../roles/role.entity';

export default class UserSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userFactory = await factoryManager.get(User);
    const roleFactory = await factoryManager.get(Role);

    const firstRole = await roleFactory.save({ name: 'foo' });
    const secondRole = await roleFactory.save({ name: 'bar' });
    const thirdRole = await roleFactory.save({ name: 'baz' });

    const roles = [firstRole, secondRole, thirdRole];

    await Promise.all(
      Array(100)
        .fill('')
        .map(async () => {
          const user = await userFactory.save({
            roles: roles.sort(() => 0.5 - Math.random()).slice(0, 2),
          });
          return user;
        })
    );
  }
}
