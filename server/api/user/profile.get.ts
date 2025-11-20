import { db } from '~~/db';
import { users } from '~~/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userContext = event.context.user;

  if (!userContext) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userContext.id),
    columns: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }

  return { user };
});
