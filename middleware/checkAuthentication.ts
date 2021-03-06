import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

const excludedNames = ['sign-in', 'sign-up']
const isExcludedName = (name: string) => {
  return excludedNames.includes(name)
}
export default defineNuxtMiddleware(
  async ({ $axios, store, route, redirect }: any) => {
    const currentRouteName = route.name as string
    if (isExcludedName(currentRouteName)) return
    let { username } = store.getters['user/username']
    console.log('middleware', username)
    if (!username) {
      username = localStorage.getItem('username')
    }
    try {
      const { data } = await $axios.get(`/api/users/${username}`)
      console.log('getUser', data)
      await store.dispatch('user/setUser', data)
    } catch (e) {
      console.error(e)
      redirect('/sign-in')
    }
  }
)
