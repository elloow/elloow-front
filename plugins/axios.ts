import { Context } from '@nuxt/types'
import { AxiosError } from 'axios'

export default function ({ $axios, redirect }: Context) {
  $axios.onError((error: AxiosError) => {
    if (error.response?.status === 401) {
      redirect('/auth/login')
    }
  })
}
