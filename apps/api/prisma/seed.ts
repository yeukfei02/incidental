import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
// import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

(async () => {
  await createUsers();
})();

async function createUsers() {
  const salt = bcrypt.genSaltSync(10);

  const users = [
    {
      email: 'admin@admin.com',
      password: bcrypt.hashSync('admin', salt),
      userRoles: UserRole.ADMIN,
    },
    {
      email: 'yeukfei02@gmail.com',
      password: bcrypt.hashSync('test', salt),
      userRoles: UserRole.NORMAL_USER,
    },
  ];

  await prisma.user.createMany({
    data: users,
  });
}
