<template>
  <div class="container home">
    <ul class="group-list">
      <li v-for="group in groups" :key="group._id">
        <p>
          {{group.title}}
        </p>
        <pre>
          {{group.tasks}}
        </pre>
        <button @click="removeGroup(group._id)">x</button>
        <button @click="updateGroup(group)">Update</button>
        <hr />
        <button @click="addGroupMsg(group._id)">Add group msg</button>
        <button @click="printGroupToConsole(group)">Print msgs to console</button>

      </li>
    </ul>
    <hr />
    <form @submit.prevent="addGroup()">
      <h2>Add group</h2>
      <input type="text" v-model="groupToAdd.vendor" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'
// import {groupService} from '../services/group.service.local'
// import { getActionRemoveGroup, getActionUpdateGroup, getActionAddGroupMsg } from '../store/group.store'
export default {
  data() {
    return {
      groupToAdd: groupService.getEmptyGroup()
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    groups() {
      return this.$store.getters.groups
    }
  },
  created() {
    this.$store.dispatch({type: 'loadGroups'})
  },
  methods: {
    async addGroup() {
      try {
        await this.$store.dispatch({type: 'addGroup', group: this.groupToAdd})
        showSuccessMsg('Group added')
        this.groupToAdd = groupService.getEmptyGroup()
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add group')
      }
    },
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch(getActionRemoveGroup(groupId))
        showSuccessMsg('Group removed')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot remove group')
      }
    },
    async updateGroup(group) {
      try {
        group = {...group}
        group.price = +prompt('New price?', group.price)
        await this.$store.dispatch(getActionUpdateGroup(group))
        showSuccessMsg('Group updated')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot update group')
      }
    },
    async addGroupMsg(groupId) {
      try {
        await this.$store.dispatch(getActionAddGroupMsg(groupId))
        showSuccessMsg('Group msg added')
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add group msg')
      }
    },
    printGroupToConsole(group) {
      console.log('Group msgs:', group.msgs)
    }
  }

  
}
</script>
