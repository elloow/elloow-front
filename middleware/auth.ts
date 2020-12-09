import { Middleware } from '@nuxt/types'
import CookieUniversal from 'cookie-universal'

const cookieAuthStatusName = 'api-elloow-auth-status'

const auth: Middleware = (ctx) => {
  try {
    const cookies = CookieUniversal(ctx.req, ctx.res)
    const cAuthStatus = cookies.get(cookieAuthStatusName)

    if (cAuthStatus === undefined) { throw new Error('Authentication failed') }

    const data = JSON.parse(Buffer.from(cAuthStatus, 'base64').toString()).message

    if (data === undefined || !data.auth) {
      throw new Error('Authentication failed')
    } else {
      // TODO : implement vuex
      // ctx.store.commit('SET_AUTHENTICATE_USER', {
      //   username: data.data.username,
      //   role: data.data.role
      // })
    }
  } catch (error) {
    return ctx.redirect('/login')
  }
}

export default auth
