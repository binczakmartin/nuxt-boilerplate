import { db } from '~~/db';
import { users } from '~~/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { signToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    });
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const token = signToken({ id: existingUser.id, email: existingUser.email });

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    user: {
      id: existingUser.id,
      email: existingUser.email,
    },
  };
});
