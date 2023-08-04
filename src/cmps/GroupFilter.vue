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
      <label class="button">
        <input type="checkbox" v-model="noMembers" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"> </span>
        </span>
        <p class="btn-txt">No members</p>
      </label>

      <label>
        <input type="checkbox" v-model="assignedToMe" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        <p class="btn-txt">Assigned to me</p>
      </label>
      <select v-model="selectedMember">
        <option disabled value="">Please select a member</option>
        <option v-for="member in members" :key="member.id" :value="member.id">
          {{ member.username }}
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
        <p class="btn-txt">No date</p>
      </label>
      <label>
        <input type="checkbox" v-model="overdue" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        <p class="btn-txt">Overdue</p>
      </label>
      <label>
        <input type="checkbox" v-model="dueInNextDay" class="hidden-checkbox" />
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        <p class="btn-txt">Due in the next day</p>
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
        <p class="btn-txt">No labels</p>
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
        <div
          class="btn-txt filter-label"
          :style="{ backgroundColor: label.color }"
        >
          {{ label.title }}
        </div>
      </label>
      <select v-model="selectedLabel">
        <option disabled value="">Please select a label</option>
        <option v-for="label in hiddenLabels" :key="label.id" :value="label.id">
          {{ label.title }}
        </option>
      </select>
    </section>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'

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
      selectedLabels: [], // Will hold the selected labels
      allLabels: [], // Should contain all the labels
    }
  },
  computed: {
    visibleLabels() {
      return this.labels.slice(0, 3)
    },
    hiddenLabels() {
      return this.labels.slice(3)
    },
  },
  methods: {
    toggleLabel(label) {
      label.selected = !label.selected
    },
  },
  components: {
    Multiselect,
  },
}
</script>

<style scoped>
.filter-label {
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 3px;
  max-width: 100%;
  height: 32px;
  text-align: start;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.filter {
  z-index: 10;
  position: absolute;
  top: 14%;
  left: 72%;
  background-color: white;
  padding: 15px;
  padding-inline-start: 19.9px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 384px;
  /* overflow-y: auto; */
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
  opacity: 0;
}

.icon-checkbox {
  display: flex;
  position: relative;
  cursor: pointer;
  font-size: 1.5rem;
}

.btn-txt {
  margin-inline-start: 2em;
  align-self: center; /* This will vertically align the text in the middle */
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
  transition: background 0.2s ease-in-out, border 0.1s ease-in-out; /* Adjust this line */
}
.hidden-checkbox:focus:not(:checked) + .icon-checkbox:before {
  border: 2px solid black;
}

.hidden-checkbox:active + .icon-checkbox:before {
  background: #0c66e4;
  border: 1px solid #0c66e4;
}

.hidden-checkbox:checked + .icon-checkbox:before {
  background: #0c66e4;
  border: 2px solid black;
}

.hidden-checkbox:checked:focus + .icon-checkbox:before {
  border: 2px solid black;
}

.hidden-checkbox:checked:not(:focus) + .icon-checkbox:before {
  border: none;
  border: 2px solid #0c66e4;
  border-radius: 2px;
}

.icon-checkbox:after {
  content: '\e916';
  font-family: 'trellicons';
  color: #ffffff;
  font-size: 0.8rem;
  position: absolute;
  left: 2px;
  top: -2px;
  width: 12px;
  height: 12px;
  text-align: center;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0;
}

.hidden-checkbox:checked + .icon-checkbox:after {
  opacity: 1;
}

/* <svg width="16px" height="16px" viewBox="-3 -4 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" role="presentation"><path d="M1.49022 3.21486C1.2407 2.94412 0.818938 2.92692 0.548195 3.17644C0.277453 3.42597 0.260252 3.84773 0.509776 4.11847L2.91785 6.73131C3.2762 7.08204 3.80964 7.08204 4.14076 6.75092C4.18159 6.71082 4.18159 6.71082 4.38359 6.51218C4.57995 6.31903 4.79875 6.1037 5.03438 5.87167C5.70762 5.20868 6.38087 4.54459 7.00931 3.92318L7.0362 3.89659C8.15272 2.79246 9.00025 1.9491 9.47463 1.46815C9.73318 1.20602 9.73029 0.783922 9.46815 0.525367C9.20602 0.266812 8.78392 0.269712 8.52537 0.531843C8.05616 1.00754 7.21125 1.84829 6.09866 2.94854L6.07182 2.97508C5.4441 3.59578 4.77147 4.25926 4.09883 4.92165C3.90522 5.11231 3.72299 5.29168 3.55525 5.4567L1.49022 3.21486Z"></path></svg> */
</style>
