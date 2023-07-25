<template>
  <div class="container">
    <h1>About Us</h1>
    <p>We like You</p>
    <h2>Lets Chat About {{topic}}</h2>
    <label>
      <input type="radio" value="Politics" v-model="topic" @change="changeTopic" /> 
      Politics
    </label>
    <label>
      <input type="radio" value="Love" v-model="topic" @change="changeTopic" /> 
      Love
    </label>
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{msg.from}}:</span>{{msg.txt}}
      </li>
    </ul>
    <hr />
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg"/>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import {socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC} from '../services/socket.service'

export default {
  data() {
    return {
      msg: {from: 'Guest', txt: ''},
      msgs: [],
      topic : 'Love',
    }
  },
  created() {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      console.log('Sending', {...this.msg})
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      const user = userService.getLoggedinUser()
      const from = user?.fullname || 'Guest'
      this.msg.from = from
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      this.msg = {from, txt: ''}
    },
    changeTopic() {
      socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    }
  }
}
</script>
