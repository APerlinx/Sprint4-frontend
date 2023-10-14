<template>
  <div class="login-container">
    <div class="logo">
      <i class="fa fa-trello"></i>
      <h2>Trio</h2>
    </div>
    <h5 class="continue">Log in to continue</h5>

    <form class="form-login" @submit.prevent="doLogin">
      <select v-model="loginCred.username">
        <option value="" disabled selected>Select User</option>
        <option v-for="user in users" :key="user._id" :value="user.username">
          {{ user.fullname }}
        </option>
      </select>
      <button>Continue</button>
    </form>

    <p class="sub-login-topic">OR</p>
    <div class="login">
      <img
        src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.499/google-logo.5867462c.svg"
        alt=""
      />
      <span>Continue with Google</span>
    </div>
    <div class="login">
      <img
        src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.499/apple-logo.54e0d711.svg"
        alt=""
      />
      <span> Continue with Apple</span>
    </div>

    <div class="sign-up">Create an acount</div>

    <hr />

    <div class="more">One account for Trio, Jora, Conf and more.</div>
    <div class="privacy">
      <p>Privacy Policy</p>
      •
      <p>User Notice</p>
    </div>
  </div>
</template>

<script>
import ImgUploader from "../cmps/ImgUploader.vue";
import { inject } from "vue";

export default {
  name: "login-signup",

  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    return {
      Vue3GoogleOauth,
    };
  },
  data() {
    return {
      user: "",
      msg: "",
      loginCred: { username: "user1", password: "123" },
      signupCred: { username: "", password: "", fullname: "", imgUrl: "" },
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    isLoading() {
      return this.$store.getters.usersIsLoading;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$router.push("/board");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$router.push("/");
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId });
        this.msg = "User removed";
      } catch (err) {
        this.msg = "Failed to remove user";
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl;
    },
  },
  components: {
    ImgUploader,
  },
};
</script>
