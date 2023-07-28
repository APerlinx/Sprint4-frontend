<!-- <template>
    <Datepicker v-model="picked" />
</template>

<script>
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date());

export default {
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        /**
         * `v-model` for selected date
         */
        modelValue: {
            type: Date as PropType<Date>,
            required: false,
        },
        /**
         * Dates not available for picking
         */
        disabledDates: {
            type: Object as PropType<{ dates?: Date[] }>,
            required: false,
        },
        /**
         * Upper limit for available dates for picking
         */
        upperLimit: {
            type: Date,
            required: false,
        },
        /**
         * Lower limit for available dates for picking
         */
        lowerLimit: {
            type: Date,
            required: false,
        },
        /**
         * View on which the date picker should open. Can be either `year`, `month`, or `day`
         */
        startingView: {
            type: String as PropType<'year' | 'month' | 'day'>,
            required: false,
            default: 'day',
            validate: (v: unknown) =>
                typeof v === 'string' && ['day', 'month', 'year'].includes(v),
        },
        /**
         * `date-fns`-type formatting for a month view heading
         */
        monthHeadingFormat: {
            type: String,
            required: false,
            default: 'LLLL yyyy',
        },
        /**
         * `date-fns`-type formatting for the month picker view
         */
        monthListFormat: {
            type: String,
            required: false,
            default: 'LLL',
        },
        /**
         * `date-fns`-type formatting for a line of weekdays on day view
         */
        weekdayFormat: {
            type: String,
            required: false,
            default: 'EE',
        },
        /**
         * `date-fns`-type format in which the string in the input should be both
         * parsed and displayed
         */
        inputFormat: {
            type: String,
            required: false,
            default: 'yyyy-MM-dd',
        },
        /**
         * [`date-fns` locale object](https://date-fns.org/v2.16.1/docs/I18n#usage).
         * Used in string formatting (see default `monthHeadingFormat`)
         */
        locale: {
            type: Object as PropType<Locale>,
            required: false,
        },
        /**
         * Day on which the week should start.
         *
         * Number from 0 to 6, where 0 is Sunday and 6 is Saturday.
         * Week starts with a Monday (1) by default
         */
        weekStartsOn: {
            type: Number,
            required: false,
            default: 1,
            validator: (value: any) => [0, 1, 2, 3, 4, 5, 6].includes(value),
        },
        /**
         * Disables datepicker and prevents it's opening
         */
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    }
}
</script>

 -->
