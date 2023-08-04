<template>
  <section class="filter" :style="filterStyle">
    <input type="text" v-model="searchTerm" placeholder="Search..." />

    <!-- Members section -->
    <section class="filter-section">
      <h2>Members</h2>
      <label>
        <input type="checkbox" v-model="noMembers" />
        No members
      </label>
      <label>
        <input type="checkbox" v-model="assignedToMe" />
        Assigned to me
      </label>
      <select v-model="selectedMember">
        <option disabled value="">Please select a member</option>
        <option v-for="member in members" :key="member.id" :value="member.id">
          {{ member.name }}
        </option>
      </select>
    </section>

    <!-- Due date section -->
    <section class="filter-section">
      <h2>Due date</h2>
      <label>
        <input type="checkbox" v-model="noDate" />
        No date
      </label>
      <label>
        <input type="checkbox" v-model="overdue" />
        Overdue
      </label>
      <label>
        <input type="checkbox" v-model="dueInNextDay" />
        Due in the next day
      </label>
    </section>

    <!-- Labels section -->
    <section class="filter-section">
      <h2>Labels</h2>
      <label>
        <input type="checkbox" v-model="noLabels" />
        No labels
      </label>
      <label v-for="label in labels" :key="label.id">
        <input type="checkbox" v-model="label.checked" />
        {{ label.name }}
      </label>
      <select v-model="selectedLabel">
        <option disabled value="">Please select a label</option>
        <option v-for="label in labels" :key="label.id" :value="label.id">
          {{ label.name }}
        </option>
      </select>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: '',
      noMembers: false,
      assignedToMe: false,
      selectedMember: '',
      noDate: false,
      overdue: false,
      dueInNextDay: false,
      noLabels: false,
      selectedLabel: '',
    }
  },
}
</script>

<style scoped>
.filter {
  z-index: 10;
  position: absolute;
  top:14%;
  left:72%;
  background-color: white;
  padding: 15px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 384px;
  overflow-y: auto;  /* Make it scrollable vertically */
  border-radius: 8px;
}

.filter input[type='text'] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h2 {
  margin-bottom: 10px;
}

.filter-section label {
  display: block;
  margin-bottom: 5px;
}

.filter-section select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
