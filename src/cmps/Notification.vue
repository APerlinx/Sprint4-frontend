<template>
    <div class="notifiction-menu">
        <div class="not-title">
            <h2>Notifications</h2>
            <div class="filter-btn">button</div>
        </div>


        <div class="not-line"></div>

        <div class="notification-container">
            <div v-for="not in fullUser.notifications" :key="not.id" class="not">
                <div class="not-top">
                    <div class="not-preview">
                        <p>{{ not.task }}</p>
                        <div v-if="not.duedate" class="date">
                            <span class="time-icon"></span> <span class="not-date">{{ not.date }}</span>
                        </div>
                    </div>
                    <div class="board-title">
                        <pre>{{ not }}</pre>
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
        }
    },
    components: {
    },
    created() {
    },
    methods: {
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
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
        users() {
            return this.$store.getters.users
        },
        fullUser() {
            return this.users.find(user => user._id === this.loggedinUser._id)
        }
    }
}
</script>
  