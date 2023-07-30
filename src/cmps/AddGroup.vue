<template>
  <section class="add-group">
    <form @submit.prevent="saveGroup">
      <input
        v-model="groupTitle"
        type="text"
        placeholder="Enter list title..."
      />
      <div>
        <button class="form-btn add-btn" >Add list</button>
        <button class="form-btn" @click.prevent="closeComponent"><span class="icon close"></span></button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      groupTitle: '',
    };
  },
  methods: {
    saveGroup() {
      this.$emit('addGroup', this.groupTitle);
      this.groupTitle = '';
    },
    closeComponent() {
      this.$emit('close');
    },
  },
};
</script>
