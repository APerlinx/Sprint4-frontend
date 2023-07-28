<template>
    <section class="modal-checklist">
        <h5></h5>
        <label for="checklist-input">Title</label>
        <input type="text" v-model="checklistTitle" placeholder="Checklist" v-focus id="checklist-input" />
        <button class="add-checklist" @click="addCheckList">Add</button>
    </section>
</template>

<script>


export default {
    data() {
        return {
            checklistTitle: ''
        }
    },
    methods: {
        addCheckList() {
            // check how to continue writing on place holder input
            if (!this.checklistTitle) this.checklistTitle = 'Checklist'

            const currChecklist = {
                title: this.checklistTitle,
                todos: []
            }
            this.$emit('addChecklist', { type: 'checklist', info: currChecklist });
        }
    }
}
</script>