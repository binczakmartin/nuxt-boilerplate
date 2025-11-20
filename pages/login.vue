<template>
  <AuthWrapper glow-position="right">
    <template #panel>
      <AuthPanelContent
        eyebrow="Welcome"
        title="Sign in to continue."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        :highlights="highlights"
      >
        <div class="panel-stats">
          <div v-for="stat in panelStats" :key="stat.label" class="stat-item">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </AuthPanelContent>
    </template>

    <template #form>
      <AuthFormHeader title="Sign in">
        <template #subtitle>
          or <NuxtLink to="/register">create new account</NuxtLink>
        </template>
      </AuthFormHeader>

      <form class="auth-form" @submit.prevent="handleLogin">
        <UiInput
          v-model="form.email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          required
        />

        <UiInput
          v-model="form.password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <UiButton
          type="submit"
          variant="primary"
          :loading="loading"
          block
        >
          Sign in
        </UiButton>
      </form>
    </template>
  </AuthWrapper>
</template>

<script setup lang="ts">
const { login, loading } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const error = ref('')

const highlights = [
  'Secure authentication',
  'Easy access to features',
  'Simple and intuitive'
]

const panelStats = [
  { value: '99%', label: 'Uptime' },
  { value: '24/7', label: 'Support' }
]

const handleLogin = async () => {
  error.value = ''
  const success = await login(form.email, form.password)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password'
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.panel-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.stat-item {
  border-radius: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
  padding: 1rem;
}

.stat-item strong {
  display: block;
  font-size: 1.4rem;
  color: #000000;
}

.stat-item span {
  color: rgba(0, 0, 0, 0.6);
}

.error-message {
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
  font-size: 0.9rem;
}
</style>
