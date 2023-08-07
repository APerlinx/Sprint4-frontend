<template>
    <div class="notifiction-menu">
        <div class="not-title">
            <h2>Notifications</h2>
            <div class="filter-btn" @click="toggleFilter">button</div>
            <pre>{{ isFilterByAll }}</pre>
        </div>


        <div class="not-line"></div>

        <div v-for="not in fillterdNotification" :key="not.id" class="notification-container">
            <div class="not-read-icon" @click="toggleNotification(not)">X</div>
            <!-- <pre>{{ not }}</pre> -->
            <div class="not">
                <div class="not-top">
                    <div class="not-preview">
                        <p>{{ not.task }}</p>
                        <div v-if="not.duedate" class="date">
                            <span class="time-icon"></span> <span class="not-date">{{ not.date }}</span>
                        </div>
                    </div>
                    <div class="board-title">
                        <p>{{ not.board }}</p>
                    </div>
                </div>
                <div class="not-bottom">

                    <div class="not-user">
                        <div class="user-avatar">{{ userAvatar(not.byUser) }}</div>
                        <div class="user-name">{{ not.byUser }}</div>
                    </div>

                    <div class="not-actions">
                        <p> {{ not.action }} <span> {{ not.createdAt }}</span></p>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isFilterByAll: false
        }
    },
    components: {
    },
    created() {
        this.removeNotifications()
    },
    methods: {
        toggleNotification(notification) {
            this.$store.dispatch({ type: 'toggleNotification', notification })

        },
        toggleFilter() {
            this.isFilterByAll = !this.isFilterByAll
        },
        isUserRead() {
            this.$emit('setReadNotifications')
        },
        removeNotifications() {
            this.$store.dispatch({ type: 'removeNotifications'})
        }
    },
    computed: {
        // loggedinUser() {
        //     return this.$store.getters.loggedinUser
        // },
        userAvatar() {
            return user => {
                if (!user) return "";

                const names = user.split(" ");
                if (names.length === 1) {
                    return names[0].charAt(0);
                } else {
                    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
                }
            }
        },
        // users() {
        //     return this.$store.getters.users
        // },
        fullUser() {
            return this.$store.getters.fullUser
        },
        fillterdNotification() {
            const filterBy = this.isFilterByAll

            if (filterBy) {
                return this.fullUser?.notifications
            } else {
                return this.fullUser?.notifications.filter(notification => notification.isRead === false)
            }

        }
    }
}
</script>
  