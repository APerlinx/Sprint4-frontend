<template>
    <section class="modal-checklist">
        <label>Title</label>
        <input type="text" v-model="checkListTitle" placeholder="Checklist" v-focus />
        <button class="add-checklist" @click="addCheckList">Add</button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            checklistTitle: 'Checklist'
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
            this.$emit('addTaskOpt', { type: 'checklist', info: currChecklist });
        }
    }
}
</script>