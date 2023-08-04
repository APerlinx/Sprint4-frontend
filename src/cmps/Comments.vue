<template>
    <section class="comment-section">
        <div class="comment-log">
            <!-- <pre>{{ comments }}</pre> -->
            <div class="comment-list">
                <!-- <div class="image-warpper"></div> -->
                <img v-if="comments.byMember.fullname !== 'Guest'" :src="comments.byMember?.imgUrl" />
                <div v-else class="active-user">G</div>
                <div class="comment-details">
                    <span class="comment-member-name">
                        {{ comments.byMember.fullname + ' ' }}
                    </span>
                    <span class="comment-txt">{{ comments.txt + ' ' }} </span>
                    <!-- <span class="comment-task-title" v-if="comments.task && comments.task.title"> -->
                    <span class="comment-task-title">
                        {{ comments.title }}
                    </span>
                    <br />
                    <span class="comment-created-at">
                        {{ timeFormat(comments.createdAt) }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: [],
    props: {
        comments: {
            type: Object,
            default: () => { },
        },
    },
    methods: {
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
    },
}
</script>