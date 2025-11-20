<template>
  <AuthWrapper glow-position="left">
    <template #panel>
      <AuthPanelContent
        eyebrow="Get Started"
        title="Create your account today."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore."
      >
        <div class="pill-grid">
          <span v-for="pill in perks" :key="pill" class="pill">{{ pill }}</span>
        </div>
        <div class="milestones">
          <article v-for="milestone in milestones" :key="milestone.title" class="milestone">
            <strong>{{ milestone.time }}</strong>
            <p>{{ milestone.title }}</p>
          </article>
        </div>
      </AuthPanelContent>
    </template>

    <template #form>
      <AuthFormHeader title="Register">
        <template #subtitle>
          Already have an account? <NuxtLink to="/login">Sign in</NuxtLink>
        </template>
      </AuthFormHeader>

      <form class="auth-form" @submit.prevent="handleRegister">
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

        <UiInput
          v-model="form.passwordConfirm"
          type="password"
          label="Confirm Password"
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
          Create account
        </UiButton>
      </form>
    </template>
  </AuthWrapper>
</template>

<script setup lang="ts">
const { register, loading } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  passwordConfirm: ''
})

const error = ref('')

const perks = ['Feature A', 'Feature B', 'Feature C', 'Feature D']
const milestones = [
  { time: 'Step 1', title: 'Account setup complete' },
  { time: 'Step 2', title: 'First action completed' },
  { time: 'Step 3', title: 'Ready to use' }
]

const handleRegister = async () => {
  error.value = ''
  
  if (form.password !== form.passwordConfirm) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  const success = await register(form.email, form.password)
  if (success) {
    router.push('/login')
  } else {
    error.value = 'Registration failed. Email might be in use.'
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.pill {
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.35rem 1rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
}

.milestones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.milestone {
  border-radius: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
  padding: 1rem;
}

.milestone strong {
  display: block;
  color: #000000;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.milestone p {
  margin: 0.4rem 0 0;
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
