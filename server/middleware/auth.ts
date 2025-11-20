import { verifyToken } from '../utils/jwt';

export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token');

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      event.context.user = decoded;
    }
  }
});
