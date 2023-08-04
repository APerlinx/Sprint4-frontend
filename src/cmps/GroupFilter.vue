<template>
  <section class="filter" :style="filterStyle">
    <header class="group-filter-header">
      <span style="color: white">.</span>
      <span class="title">Filter</span>
      <span class="close-icon"></span>
    </header>
    <label class="input-label">Keyword</label>
    <input type="text" v-model="searchTerm" placeholder="Enter a keyword..." />
    <p class="input-text">Search cards, members, labels, and more.</p>
    <!-- Members section -->
    <section class="filter-section">
      <p class="section-label">Members</p>
      <label>
        <input type="checkbox" v-model="noMembers" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"> </span>
        </span>
        No members
      </label>
      <label>
        <input type="checkbox" v-model="assignedToMe" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        Assigned to me
      </label>
      <select v-model="selectedMember">
        <option disabled value="">Please select a member</option>
        <option v-for="member in members" :key="member.id" :value="member.id">
          {{ member.name }}
        </option>
      </select>
    </section>

    <section class="filter-section">
      <p class="section-label">Due date</p>
      <label>
        <input type="checkbox" v-model="noDate" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        No date
      </label>
      <label>
        <input type="checkbox" v-model="overdue" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        Overdue
      </label>
      <label>
        <input type="checkbox" v-model="dueInNextDay" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        Due in the next day
      </label>
    </section>

    <!-- Labels section -->
    <section class="filter-section">
      <p class="section-label">Labels</p>
      <label>
        <input type="checkbox" v-model="noLabels" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        No labels
      </label>
      <label v-for="label in visibleLabels" :key="label.id">
        <input
          type="checkbox"
          v-model="label.checked"
          class="hidden-checkbox"
        />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        {{ label.name }}
      </label>
      <select v-model="selectedLabel">
        <option disabled value="">Please select a label</option>
        <option v-for="label in hiddenLabels" :key="label.id" :value="label.id">
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
  computed: {
    visibleLabels() {
      // This will only return the first three labels
      return this.labels.slice(0, 3)
    },
    hiddenLabels() {
      // This will return all the labels after the third one
      return this.labels.slice(3)
    },
  },
}
</script>

<style scoped>
.filter {
  z-index: 10;
  position: absolute;
  top: 14%;
  left: 72%;
  background-color: white;
  padding: 15px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 384px;
  overflow-y: auto;
  border-radius: 8px;
}

.filter input[type='text'] {
  width: 100%;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-block-start: 0.5em;
}

input::placeholder {
  color: #172b4d;
}

.input-label {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
  color: #44546f;
}

.input-text {
  color: #44546f;
  font-size: 11px;
  line-height: 14px;
  margin-top: 8px;
  margin-bottom: 4px;
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

.section-label {
  color: #44546f;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
}

.hidden-checkbox {
  position: absolute;
  opacity: 0; /* Hide the checkbox */
}

.icon-checkbox {
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1.5rem;
}

.icon-checkbox:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border: 2px solid rgb(228, 228, 228);
  border-radius: 4px;
  background: white;
}

.icon-checkbox:after {
  content: '\e916';
  font-family: 'trellicons';
  color: #FFFFFF;
  /* background-color: #0c66e4; */
  font-size: 1rem;
  position: absolute;
  left: 0px;
  top: -2px;
  width: 12px;
  height: 12px;
  text-align: center;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0;
  /* border: 2px solid black; */
  
}

.hidden-checkbox:checked + .icon-checkbox:after {
  opacity: 1;
}

/* <svg width="16px" height="16px" viewBox="-3 -4 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" role="presentation"><path d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z"></path></svg> */
</style>
