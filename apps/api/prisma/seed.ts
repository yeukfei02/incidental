import { PrismaClient, IncidentType, UserRole, Status } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

(async () => {
  await createUsers();
  await createIncidents();
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

async function createIncidents() {
  const incidents: any[] = [];

  const adminUser = await prisma.user.findFirst({
    where: {
      userRoles: {
        hasEvery: [UserRole.ADMIN],
      },
    },
  });
  const normalUser = await prisma.user.findFirst({
    where: {
      userRoles: {
        hasEvery: [UserRole.NORMAL_USER],
      },
    },
  });

  if (adminUser && normalUser) {
    for (let i = 0; i < 10; i++) {
      const data = {
        title: faker.lorem.words(),
        description: faker.lorem.text(),
        type: i % 2 !== 0 ? IncidentType.HIGH : IncidentType.MEDIUM,
        creator_id: adminUser.id,
        assignee_id: normalUser.id,
        status: Status.ASSIGNED,
      };
      incidents.push(data);
    }
  }

  await prisma.incident.createMany({
    data: incidents,
  });
}
