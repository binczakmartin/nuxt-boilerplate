type AuthUser = {
  id: number
  email: string
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('user', () => null)
  const loading = useState('auth_loading', () => false)

  const fetchMe = async () => {
    loading.value = true;
    try {
      const { user: userData } = await $fetch<{ user: AuthUser }>('/api/auth/me');
      user.value = userData;
    } catch (error) {
      console.error('[useAuth] Failed to fetch user:', error);
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
  const { user: userData } = await $fetch<{ user: AuthUser }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      user.value = userData;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string) => {
    loading.value = true;
    try {
      const { user: userData } = await $fetch<{ user: AuthUser }>('/api/auth/register', {
        method: 'POST',
        body: { email, password },
      });
      user.value = userData;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      user.value = null;
      navigateTo('/login');
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    fetchMe,
    login,
    register,
    logout,
  };
};
