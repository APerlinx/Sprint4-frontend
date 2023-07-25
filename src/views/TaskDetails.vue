<template>
    <section class="task-details">
        <section class="task-details-header">
            <input type="text" class="task-details-title" placeholder='v-model="taskToEdit.title"'>check
            <!-- v-model="taskToEdit.title" -->
            <!-- {{ taskToEdit.title }} -->
            <p>In list 'need to add list.name'</p>

        </section>

        <section class="task-detail-main">
            <div>
                <p>Notifications</p>
                <button>watch</button>
            </div>

            <div>
                <h3>Description</h3>
                <textarea placeholder="Add a more detailed description..." class="description-textarea">

                </textarea>
            </div>
            <!-- v-model="taskToEdit.description" -->
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}

</script>