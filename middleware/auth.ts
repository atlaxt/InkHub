export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.isAuth && to.name !== 'home') {
    return navigateTo({ name: 'home' })
  }
})
