<template>
      <div class="filter-container">
        <div className="search-container">
              <input 
                 class="search"
                  v-model="filterBy" 
                  @input="onSetFilterBy"
                  type="text" 
                  placeholder="Search By Name">  
                  <span class="material-symbols-outlined">search</span>          
           </div>
        <span class="material-symbols-outlined">search</span>
      </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      filterBy: ""
    };
  },
  methods: {
    onSetFilterBy() {
      this.$emit("filterByTxt", this.filterBy);
    },
  },
  }
  </script>
  
  <style>
  
  </style>