import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../users/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.joined_at = faker.date.past();

  return user;
});
