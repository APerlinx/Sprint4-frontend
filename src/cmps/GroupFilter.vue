<template>
  <section class="filter">
    <header class="group-filter-header">
      <span style="color: white">.</span>
      <span class="title">Filter</span>
      <span class="close-icon"></span>
    </header>

    <div class="content-wrapper">
      <label class="input-label">Keyword</label>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Enter a keyword..."
        @input="emitSearchTerm"
      />
      <p class="input-text">Search cards, members, labels, and more.</p>
      <!-- Members section -->
      <section class="filter-section">
        <p class="section-label">Members</p>
        <label class="button">
          <input
            type="checkbox"
            v-model="noMembers"
            class="hidden-checkbox"
            @click="emitCheckboxEvent('noMembers')"
          />
          <span class="icon-checkbox">
            <span class="icon-empty-checked"></span>
            <span class="icon-full-checked"> </span>
          </span>
          <div class="flex-container">
            <div class="member-icon-container">
              <span class="member-icon"></span>
            </div>
            <p class="clock-txt">No members</p>
          </div>
        </label>

        <label>
          <input
            type="checkbox"
            v-model="assignedToMe"
            class="hidden-checkbox"
            @click="emitCheckboxEvent('assignedToMe')"
          />

          <span class="icon-checkbox">
            <span class="icon-empty-checked"></span>
            <span class="icon-full-checked"></span>
          </span>
          <div class="flex-container button-wrapper">
            <img
              src="https://ca.slack-edge.com/T04U05NLZ2M-U04UNLA704D-abc56285845d-72"
              class="avatar-filter"
            />
            <p class="clock-txt">Cards assigned to me</p>
          </div>
        </label>
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        <select v-model="selectedMember">
          <option disabled value="">Select members</option>
          <option v-for="member in members" :key="member.id" :value="member.id">
            {{ member.username }}
          </option>
        </select>
      </section>

      <section class="filter-section">
        <p class="section-label">Due date</p>
        <label>
          <input
            type="checkbox"
            :checked="checkboxValues.noDate"
            class="hidden-checkbox"
            @change="emitCheckboxEvent('noDate', $event.target.checked)"
          />

          <span class="icon-checkbox">
            <span class="icon-empty-checked"></span>
            <span class="icon-full-checked"></span>
          </span>
          <div class="flex-container">
            <div class="date-icon">
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 4V5H4.995C3.892 5 3 5.893 3 6.994V19.006C3 20.106 3.893 21 4.995 21H19.005C20.108 21 21 20.107 21 19.006V6.994C21 5.895 20.107 5 19.005 5H18V4C18 3.448 17.552 3 17 3C16.448 3 16 3.448 16 4V5H8V4C8 3.448 7.552 3 7 3C6.448 3 6 3.448 6 4ZM5.25 9.571V17.718C5.25 18.273 5.694 18.714 6.243 18.714H17.758C18.3 18.714 18.75 18.268 18.75 17.718V9.571H5.25ZM9 13V10.999H7V13H9ZM17 10.999V13H15V10.999H17ZM11 13H13.001V10.999H11V13ZM7 17V15H9V17H7ZM11 17H13.001V15H11V17ZM17 15V17H15V15H17Z"
                  fill="rgb(68, 84, 111)"
                ></path>
              </svg>
            </div>
            <p class="clock-txt">No date</p>
          </div>
        </label>

        <label>
          <input
            type="checkbox"
            :checked="checkboxValues.overdue"
            class="hidden-checkbox"
            @change="emitCheckboxEvent('overdue', $event.target.checked)"
          />
          <span class="icon-checkbox">
            <span class="icon-empty-checked"></span>
            <span class="icon-full-checked"></span>
          </span>
          <div class="flex-container">
            <div class="icon-container-danger">
              <span class="clock-icon"></span>
            </div>
            <p class="clock-txt">Overdue</p>
          </div>
        </label>

        <label>
          <input
            type="checkbox"
            :checked="checkboxValues.dueToday"
            class="hidden-checkbox"
            @change="emitCheckboxEvent('dueInNextDay', $event.target.checked)"
          />

          <span class="icon-checkbox">
            <span class="icon-empty-checked"></span>
            <span class="icon-full-checked"></span>
          </span>
          <div class="flex-container">
            <div class="icon-container-overdue">
              <span class="clock-icon"></span>
            </div>
            <p class="clock-txt">Due in the next day</p>
          </div>
          <span class="expan-options-dropdown"
            >Show more options <span class="arrow-down-icon"></span
          ></span>
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
          <div class="flex-container">
            <div class="label-icon-container">
              <span class="label-icon"></span>
            </div>
            <p class="clock-txt">No labels</p>
          </div>
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
        <span class="icon-checkbox">
          <span class="icon-empty-checked"></span>
          <span class="icon-full-checked"></span>
        </span>
        <select v-model="selectedLabel">
          <option disabled value="">Selecet labels</option>
          <option
            v-for="label in hiddenLabels"
            :key="label.id"
            :value="label.id"
          >
            {{ label.title }}
          </option>
        </select>
      </section>
    </div>
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
      selectedLabel: '',
      noDate: false,
      overdue: false,
      dueInNextDay: false,
      noLabels: false,
      selectedMembers: [],
      selectedLabels: null,
      checkboxValues: {
        noDate: false,
        overdue: false,
        dueInNextDay: false,
      },
    }
  },
  created() {
    document.body.style.overflow = 'hidden'
  },
  unmounted() {
    document.body.style.overflow = 'auto'
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
    emitSearchTerm() {
      this.$emit('searchTermChanged', this.searchTerm)
    },
    emitCheckboxEvent(checkboxName, value) {
      this.$emit('checkboxChanged', {
        name: checkboxName,
        value,
      })
    },
  },
}
</script>

<style scoped>
.content-wrapper {
  max-height: 100vh;
  overflow-y: auto;
}

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
  position: fixed;
  top: 51%;
  left: 89.5%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 15px;
  padding-inline-start: 11.8px;
  padding-top: 14px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 384px;
  border-radius: 8px;
}

.filter input[type='text'] {
  width: 100%;
  padding: 6px;
  padding-inline-start: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-block-start: 0em;
  box-sizing: border-box;
}
.filter input[type='text']:focus {
  border: 2px solid #388bff;
  outline: none;
  box-shadow: none;
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
  margin-bottom: 16px;
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
  margin-inline-start: 0.4em;
}

.btn-txt {
  margin-inline-start: 3em;
  align-self: center;
}

.icon-checkbox:before {
  margin-top: 0.2em;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border: 2px solid rgb(228, 228, 228);
  border-radius: 2px;
  background: white;
  transition: background 0.2s ease-in-out, border 0.1s ease-in-out;
}
.hidden-checkbox:focus:not(:checked) + .icon-checkbox:before {
  margin-top: 0.2em;
  border: 2px solid black;
}

.hidden-checkbox:active + .icon-checkbox:before {
  margin-top: 0.2em;
  background: #0c66e4;
  border: 1px solid #0c66e4;
}

.hidden-checkbox:checked + .icon-checkbox:before {
  margin-top: 0.2em;
  background: #0c66e4;
  border: 2px solid black;
}

.hidden-checkbox:checked:focus + .icon-checkbox:before {
  margin-top: 0.2em;

  border: 2px solid black;
}

.hidden-checkbox:checked:not(:focus) + .icon-checkbox:before {
  margin-top: 0.2em;

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
  top: -0.1px;
  width: 12px;
  height: 12px;
  text-align: center;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0;
}

.hidden-checkbox:checked + .icon-checkbox:after {
  margin-top: 0.2em;

  opacity: 1;
}
</style>
