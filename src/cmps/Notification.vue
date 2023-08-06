<template>
    <div class="notifiction-menu">
        <div class="not-title">
            <h2>Notifications</h2>
            <pre>{{ connectedUser.fullname }}</pre>
            <div class="filter-btn">button</div>
        </div>

        <div class="not-line"></div>

        <div class="notification-container">
            <div v-for="not in connectedUser.notifications" :key="not.id" class="not">
                <div class="not-top">
                    <div class="not-preview">
                        <p>{{ not.task }}</p>
                        <div class="date">
                            <span class="time-icon"></span> <span class="not-date">{{ not.dueDate }}</span>
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
            user: null

        }
    },
    components: {
    },
    created() {
    },
    methods: {
    },
    computed: {
        getImageStyle() {
            return {
                backgroundImage: "url('https://images.unsplash.com/photo-1690207714547-6e76b0e61b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60')",
                backgroundSize: "35% auto",
                backgroundPosition: "center",
                height: "110px",
                width: "100%",
                borderRadius: "0.5em"
            }
        },
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
        connectedUser() {
            return this.users.find(user => user.fullname === this.loggedinUser.fullname)
        }
    }
}
</script>
  