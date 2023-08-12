// import { userService } from '../services/user.service.local'
import { userService } from '../services/user.service'


export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
        isLoading: false,

    },
    getters: {
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) { return loggedinUser },
        usersExcludeMe({ users, loggedinUser }) {
            return users.filter(u => u._id !== loggedinUser._id)
        },
        usersIsLoading({ isLoading }) {
            return isLoading
        },
        notifications({ loggedinUser }) {
            return loggedinUser.notifications
        },
        loggedinUserByUserName({ loggedinUser, users }) {
            return users.find(user => user.fullname === loggedinUser.fullname).username
        },
        fullUser({ loggedinUser, users }) {
            return users.find(user => user.fullname === loggedinUser?.fullname)
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as score not reactive from birth
            state.loggedinUser = (user) ? { ...user } : null
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
        setUser(state, { savedUser }) {
            const userId = savedUser._id
            const idx = state.users.findIndex(user => user._id === userId)
            state.users.splice(idx, 1, savedUser)
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                console.log(userCred);
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
            commit({ type: 'setIsLoading', isLoading: true })
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
                commit({ type: 'setIsLoading', isLoading: false })
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
        },
        async addNotifcation({ commit, state }, { notification }) {
            try {
                const user = state.users.find(user => user.fullname === notification.toUser)
                const userCopy = JSON.parse(JSON.stringify(user))
                userCopy.notifications.unshift(notification)
                userCopy.isUserReadNotifications = false
                const savedUser = await userService.update(userCopy)

                commit({ type: 'setUser', savedUser })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        async removeNotifications ({ commit, state, getters }) {
            try {
                const user = getters.fullUser
                const userCopy = JSON.parse(JSON.stringify(user))
                userCopy.isUserReadNotifications = true
                const savedUser = await userService.update(userCopy)
                console.log(savedUser.isUserReadNotifications);

                commit({ type: 'setUser', savedUser })
            } catch (err) {
                console.log(err)
                throw err
            }
        },

        async toggleNotification({ commit, state }, { notification }) {
            try {
                const user = state.users.find(user => user.fullname === notification.toUser);
                const idx = user.notifications.findIndex(not => not.createdAt === notification.createdAt);

                const userCopy = JSON.parse(JSON.stringify(user));
                userCopy.notifications[idx].isRead = !userCopy.notifications[idx].isRead

                const savedUser = await userService.update(userCopy)

                this.commit({ type: 'setUser', savedUser })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
    }
}