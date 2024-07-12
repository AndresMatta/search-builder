import { setSeederFactory } from 'typeorm-extension';
import { Role } from '../../roles/role.entity';

export default setSeederFactory(Role, (faker) => {
  const role = new Role();

  role.name = faker.person.jobType();

  return role;
});
