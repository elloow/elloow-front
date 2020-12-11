import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  currentUser: {
    email: '',
    role: '',
    organisations: []
  }
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_AUTHENTICATE_USER (state, user: any) {
    state.currentUser.email = user.email
    state.currentUser.role = user.role
    state.currentUser.organisations = user.organisations
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async getCurrentUser ({ commit }) {
    const user = (await this.$axios.$get('/v1/auth/user')).data.data
    commit('SET_AUTHENTICATE_USER', user)
  }
}
