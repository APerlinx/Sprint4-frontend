// import { userService } from '../services/user.service.local'
import { userService } from '../services/user.service'


export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
        isLoading: false
    },
    getters: {
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) { return loggedinUser },
        usersExcludeMe({users, loggedinUser}) {
            return users.filter(u => u._id !== loggedinUser._id)
        },
        usersIsLoading({isLoading}) {
            return isLoading
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as score not reactive from birth
            state.loggedinUser = (user)? {...user} : null
        },
        setUsers(state, { users }) {
            state.users = users
        },
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setUserScore(state, { score }) {
            state.loggedinUser.score = score
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            commit({type: 'setIsLoading', isLoading: true})
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
                commit({type: 'setIsLoading', isLoading: false})
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },        
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
        async increaseScore({ commit }) {
            try {
                const score = await userService.changeScore(100)
                commit({ type: 'setUserScore', score })
            } catch (err) {
                console.log('userStore: Error in increaseScore', err)
                throw err
            }
        }
    }
}