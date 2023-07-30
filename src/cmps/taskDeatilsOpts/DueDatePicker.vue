<template>
    <div class="demo-datetime-picker">
        <div class="block">
            <span class="demonstration">With default time</span>
            <el-date-picker v-model="value3" type="datetime" placeholder="Select date and time"
                :default-time="defaultTime" />
        </div>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
    data() {
        return {
            value1: '',
            value2: '',
            value3: '',
            defaultTime: new Date(2000, 1, 1, 12, 0, 0),
            // shortcuts: [
            //     {
            //         text: 'Today',
            //         value: new Date(),
            //     },
            //     {
            //         text: 'Yesterday',
            //         value: () => {
            //             const date = new Date();
            //             date.setTime(date.getTime() - 3600 * 1000 * 24);
            //             return date;
            //         },
            //     },
            //     {
            //         text: 'A week ago',
            //         value: () => {
            //             const date = new Date();
            //             date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            //             return date;
            //         },
            //     },
            // ],
        };
    },
};
</script>

<style scoped>
.demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-datetime-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-datetime-picker .block:last-child {
    border-right: none;
}

.demo-datetime-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
