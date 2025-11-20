export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchMe } = useAuth()
  
  // Only run on client side and on initial load
  if (import.meta.client) {
    await fetchMe()
  }
  
  // On server side, load user from context if available
  if (import.meta.server && nuxtApp.ssrContext?.event?.context?.user) {
    const { user } = useAuth()
    user.value = nuxtApp.ssrContext.event.context.user
  }
})
