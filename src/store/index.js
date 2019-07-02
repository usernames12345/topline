import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, saveUser } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state 中的数据可以被任何组件访问
  // 在组件中直接 this.$store.state.xxx 进行访问
  state: {
    user: getUser() || {} // user 的初始数据来自于本地存储
  },
  mutations: {
    // mutation 函数默认接收一个参数：state，也就是说容器的 state
    // 我们可以在这里通过 state.xxx = xxx 完成对容器状态的修改
    changeUser (state, user) {
      // 将参数 user 合并到 state.user 中，说白了就是对象拷贝
      Object.assign(state.user, user)

      // 将程序中最新的用户信息重新写入本地存储，防止刷新得到旧的本地存储中的用户信息
      saveUser(state.user)
    }
  }
})

export default store
