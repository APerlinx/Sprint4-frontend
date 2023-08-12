
<template>
  <component
    :board="boardToUpdate"
    :is="actionCmpType"
    :taskToEdit="taskToEdit"
    @toggleMember="toggleMember"
  >
  </component>

  <DynamicModal
    v-if="actionCmpType"
    :actionCmpType="actionCmpType"
    :taskToEdit="taskToEdit"
    :board="board"
    :actionCmpName="actionCmpName"
    @toggleMember="toggleMember"
  />
</template>

<script>
export default {
    methods: {
        toggleMember(clickedMember) {
            const taskMembers = this.taskToEdit.members || [];
            const memberIndex = taskMembers.findIndex(member => member.id === clickedMember.id);

            let action;
            if (memberIndex !== -1) {
                taskMembers.splice(memberIndex, 1);
                action = "Removed you";
            } else {
                taskMembers.push(clickedMember);
                action = "Added you";
            }

            this.createAndEditNotification(clickedMember, action)
        },

        createAndEditNotification(member, action) {
            const notification = this.createNotification(member, action);
            this.editTask(notification);
        },

        createNotification(member, action) {
            return {
                byUser: this.loggedinUser.fullname,
                toUser: member.fullname,
                createdAt: Date.now(),
                action: action,
                task: this.taskToEdit.title,
                board: this.board.title,
                date: this.taskToEdit?.dueDate
            };
        },

        editTask(notification) {
            const editedTask = JSON.parse(JSON.stringify(this.taskToEdit));
            const taskIdx = this.group.tasks.findIndex(
                task => task.id === this.taskToEdit.id
            );
            this.group.tasks.splice(taskIdx, 1, this.taskToEdit);

            socketService.emit('update-task', this.taskToEdit)

            socketService.emit('notification-push', { notification, members: this.board.members })

            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },

       //Backend (Server-side)
        socket.on('update-task', (task) => {
            socket.broadcast.to(socket.myTopic).emit('on-update-task', task)
        })
        socket.on('notification-push', ({ notification, members }) => {
            members.forEach(m => {
                emitToUser({ type: 'on-notifcation-push', data: { members, notification }, userId: m.id })
            })
        })

        //Listen in frontend (Client-side)
        socketService.on('on-update-task', (task) => this.taskToEdit = task);

        socketService.on('on-notifcation-push', this.addNotifcation)



        addNotifcation({ notification }) {
            this.$store.dispatch({ type: 'addNotifcation', notification })
        }

        // Store : ( vuex )

        async addNotifcation({ commit, state }, { notification }) {
            try {
                const user = state.users.find(user => user.fullname === notification.toUser)
                const userCopy = JSON.parse(JSON.stringify(user))
                userCopy.notifications.push(notification)
                const savedUser = await userService.update(userCopy)

                this.commit({ type: 'setUser', savedUser })
            } catch (err) {
                console.log('userStore: Error in increaseScore', err)
                throw err
            }
        }

        setUser(state, { savedUser }) {
            const userId = savedUser._id
            const idx = state.users.findIndex(user => user._id === userId)
            state.users.splice(idx, 1, savedUser)
        },
    },
}
</script>
  