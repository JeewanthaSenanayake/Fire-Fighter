<template>
    <div>
        <v-data-table  :items-per-page="7" :headers="headers" :items="tableData"
        class="elevation-1">
        <template v-slot:[`item.duration`]="{ item }">
        {{ getTimeDifference(item.startTime, item.endTime) }}
      </template>
    </v-data-table >
    </div>
</template>

<script>
export default {
    name: 'HistryTable',
    props: {
        headers: {
            type: Array,
            required: true,
        },
        tableData: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        itemsPerPage: 5,
    }),

    methods:{
        getTimeDifference(startTime, endTime) {
            // Parse the start and end time strings into hours, minutes, and seconds
            const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
            const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);

            // Create Date objects for both times on the same arbitrary day
            const start = new Date();
            start.setHours(startHours, startMinutes, startSeconds, 0);

            const end = new Date();
            end.setHours(endHours, endMinutes, endSeconds, 0);

            // Calculate the difference in milliseconds
            const differenceInMs = end - start;

            // Handle cases where end time is earlier than start time (next day)
            const adjustedDifferenceInMs = differenceInMs >= 0 ? differenceInMs : differenceInMs + 24 * 60 * 60 * 1000;

            // Convert milliseconds to hours, minutes, and seconds
            const hours = Math.floor(adjustedDifferenceInMs / (1000 * 60 * 60));
            const minutes = Math.floor((adjustedDifferenceInMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((adjustedDifferenceInMs % (1000 * 60)) / 1000);

            // Format the result as "HH:MM:SS"
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}
</script>