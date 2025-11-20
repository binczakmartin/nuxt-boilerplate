export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { user, loading } = useAuth();

  // Wait for auth plugin to finish if it's still loading
  let retries = 0;
  while (loading.value && retries < 10) {
    await new Promise(resolve => setTimeout(resolve, 100));
    retries++;
  }

  // If no user after waiting, redirect to login
  if (!user.value) {
    return navigateTo('/login');
  }
});
