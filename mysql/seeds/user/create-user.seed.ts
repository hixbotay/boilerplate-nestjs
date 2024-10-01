import { name, internet } from 'faker';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { getRepository, Connection } from 'typeorm';
import { Role } from '../path/to/role.entity';

export default class CreateUsers {
  constructor() {}

  public async run(): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: 1,
          name: name.firstName(),
          username: name.lastName(),
          password: internet.password(),
        },
        {
          id: 2,
          name: name.firstName(),
          username: name.lastName(),
          password: internet.password(),
        },
      ])
      .execute();

    let adminUser = connection
    .createQueryBuilder()
    .insert()
    .into('users')
    .values([
      {
        id: 1,
        name: name.firstName(),
        username: name.lastName(),
        password: internet.password(),
      },
      {
        id: 2,
        name: name.firstName(),
        username: name.lastName(),
        password: internet.password(),
      },
    ])
    .execute();
    if (!adminUser) {
      // Create the admin user
      const passwordHash = await bcrypt.hash('Koph4iem132', 10); // Hash the password
      adminUser = await userRepository.save({
        name: 'admin',
        username: 'admin',
        email: 'admin@example.com',
        password: passwordHash, // Replace with hashed password
      });

      await userRepository.save(adminUser);
    }

    // Find the 'admin' role in the roles table
    const adminRole = await roleRepository.findOneBy({ name: 'admin' });

    if (adminRole && adminUser) {
      // Check if the user already has this role
      const userRoleExists = await userRoleRepository.findOneBy({
        user_id: adminUser.id,
        role_id: adminRole.id,
      });

      if (!userRoleExists) {
        // Add the admin role to user_roles
        const userRole = userRoleRepository.create({
          user_id: adminUser.id,
          role_id: adminRole.id,
        });

        await userRoleRepository.save(userRole);
      }
    }
  }
}
