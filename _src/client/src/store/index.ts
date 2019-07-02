
const actions = {
  async nuxtServerInit({ dispatch, commit }, ctx) {
    if (!ctx.route || !ctx.route.name) {
      return
    }
    try {
      // so you do someing  when fist open or page refresh
      // like get user info
      // await dispatch('user/load', 'solid');
    } catch (err) {
      const r = ''
    }
  }
}

export const strict = false
