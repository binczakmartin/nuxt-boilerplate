import jwt from 'jsonwebtoken';

const config = useRuntimeConfig();

export const signToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    console.error(error);
    return null;
  }
};
