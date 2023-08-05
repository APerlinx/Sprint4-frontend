<template>
    <div class="notifiction-menu">
        <div class="not-title">
            <h2>Notifications</h2>
            <div class="filter-btn">button</div>
        </div>

        <div class="not-line"></div>

        <div class="notification-container">
            <div v-for="not in loggedinUser.notifications" class="not">
                <div class="not-top">
                    <div class="not-preview">
                        <p>avarag color</p>
                        <div class="date">
                            <span class="time-icon"></span> <span class="not-date">Aug 25</span>
                        </div>
                    </div>
                    <div class="board-title">
                        <p>board title</p>
                    </div>
                </div>
                <div class="not-bottom">

                    <div class="not-user">
                        <div class="user-avatar">SZ</div>
                        <div class="user-name">Shay Z</div>
                    </div>

                    <div class="not-actions">
                        <p> Added a dur date of Aug 25 at 11:43 <span>aug 3 at 1:43 pm</span></p>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
  
<script>
export default {
    components: {
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
        }
    }
}
</script>
  