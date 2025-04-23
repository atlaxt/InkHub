export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (auth.loading)
    return

  if (!auth.isAuth && to.name !== 'home') {
    return navigateTo({ name: 'home' })
  }
})
