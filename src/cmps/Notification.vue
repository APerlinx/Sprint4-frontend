<template>
    <div class="notification-menu" v-click-outside="closeNotification">
        <div class="notification-title">
            <h2>Notifications</h2>
        </div>

        <hr>

        <div v-if="!fillterdNotification.length" class="no-notification">No notification...</div>
        <div v-else v-for="not in fillterdNotification" :key="not.id">
            <div class="notification">
                <div class="notification-top">
                    <div class="notification-preview">
                        <p>{{ not.task }}</p>
                        <div v-if="not.duedate" class="date">
                            <span class="time-icon"></span> <span class="notification-date">{{ not.date }}</span>
                        </div>
                    </div>
                    <div class="board-title">
                        <p>{{ not.board }}</p>
                    </div>
                </div>
                <div class="notification-bottom">
                    <div class="notification-user">
                        <div class="user-avatar">{{ userAvatar(not.byUser) }}</div>
                        <div class="user-name">{{ not.byUser }}</div>
                    </div>
                    <div class="notification-actions">
                        <p> {{ not.action }} "<span class="bold">{{ not.task }}</span>" Task at <span class="bold"> {{  formattedCreatedAt(not.createdAt) }}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="notification-menu">
        <div class="not-title">
            <h2>Notifications</h2>
        </div> -->
        <!-- <div class="filter-btn">
            <img class="check" src="../assets/icon/checkmark.png" alt="">
            <div class="filter-title">Unread</div>
        </div> -->
        <!-- <div class="day-title" v-if="fillterdNotification.length > 0">Today</div> -->
        <!-- <div class="not-container" v-for="not in fillterdNotification" :key="not.id"> -->
            <!-- <pre>{{not}}</pre> -->
            <!-- <div class="not">
                <div class="not-icon"><img src="../assets/icon/gameboy.png" alt=""></div>
                <div class="not-text">
                    <div class="action"> <span>{{ not.byUser + ' ' + not.action + ' ' + not.task }}</span>
                        <span class="the-board-title">{{ 'task in ' + not.board }}</span>
                    </div>
                    <div class="not-time">
                        <p>{{ timeFormat (not.createdAt) }}</p>
                    </div>
                </div>
            </div> -->
        <!-- </div> -->
    <!-- </div> -->
</template>
  
<script>

import { clickOutsideDirective } from '../directives/index.js'
export default {
    data() {
        return {
            isFilterByAll: false
        }
    },
    components: {
    },
    created() {
        // this.removeNotifications()
    },
    methods: {
        closeNotification() {
            this.$emit('closeNotification')
        },

        toggleNotification(notification) {
            this.$store.dispatch({ type: 'toggleNotification', notification })

        },
        toggleFilter() {
            this.isFilterByAll = !this.isFilterByAll
        },
        isUserRead() {
            this.$emit('setReadNotifications')
        },
        // removeNotifications() {
        //     this.$store.dispatch({ type: 'removeNotifications' })
        // },
        timeFormat(timestamp) {
            const now = Date.now()
            const timeDiff = now - timestamp

            if (timeDiff < 1000 * 60) {
                return 'Just now'
            } else if (timeDiff < 1000 * 60 * 60) {
                return Math.round(timeDiff / (1000 * 60)) + ' minutes ago'
            } else if (timeDiff < 1000 * 60 * 60 * 24) {
                return Math.round(timeDiff / (1000 * 60 * 60)) + ' hours ago'
            } else if (timeDiff < 1000 * 60 * 60 * 24 * 7) {
                return Math.round(timeDiff / (1000 * 60 * 60 * 24)) + ' days ago'
            } else if (timeDiff < 1000 * 60 * 60 * 24 * 30) {
                return Math.round(timeDiff / (1000 * 60 * 60 * 24 * 7)) + ' weeks ago'
            } else {
                const date = new Date(timestamp)
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }
                return date.toLocaleDateString(undefined, options)
            }
        },
        formattedCreatedAt(date) {
            const createdAtDate = new Date(date);
            const year = createdAtDate.getFullYear();
            const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
            const day = String(createdAtDate.getDate()).padStart(2, '0');
            const hours = String(createdAtDate.getHours()).padStart(2, '0');
            const minutes = String(createdAtDate.getMinutes()).padStart(2, '0');

            return `${year}/${month}/${day} ${hours}:${minutes}`;
        }
    },
    computed: {
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

        fullUser() {
            return this.$store.getters.fullUser
        },
        fillterdNotification() {
                return this.fullUser?.notifications
            // const filterBy = this.isFilterByAll

            // if (filterBy) {
            //     return this.fullUser?.notifications
            // } else {
            //     return this.fullUser?.notifications.filter(notification => notification.isRead === false)
            // }
        },
        
    },
    directives: {
        clickOutside: clickOutsideDirective,
    },
}
</script>
  



<!-- desktop -->
 
