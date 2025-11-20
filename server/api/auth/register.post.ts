import { db } from '~~/db';
import { users } from '~~/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { signToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password || password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
    });
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [newUser] = await db.insert(users).values({
    email,
    passwordHash,
  }).returning();

  // Automatically log in the user after registration
  const token = signToken({ id: newUser.id, email: newUser.email });

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
    },
  };
});
