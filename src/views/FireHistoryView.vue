<template>
    <div>
        <NavigatorComponent :pageName="`Fire History`" />
        <v-container>
            <v-card style="background-color: #424242; border-radius: 15px; height: 100vh;" class="pa-2">
                <h1 class="text-center my-3" style="color: white;">Fire Dashboard</h1>

                <v-card class="ma-3 pa-3" style="border-radius: 15px; background-color: #616161;">
                <HistryTable :headers="headers" :tableData="tableData" />
                </v-card>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import NavigatorComponent from '@/components/NavigatorComponent.vue';
import HistryTable from '@/components/HistryTable.vue';
export default {
    name: 'FireHistoryView',

    components: {
        NavigatorComponent,
        HistryTable
    },

    data: () => ({
        headers: [
            {
                title: 'Location',
                align: 'start',
                sortable: false,
                key: 'location',
            },
            { title: 'Date', key: 'date', align: 'end' },
            { title: 'Time', key: 'time', align: 'end' },
            { title: 'Duration', key: 'duration', align: 'end' },
        ],

        tableData: [
            {
                location: 'Colombo',
                date: '2021-09-01',
                time: '10:00',
                duration: '1 hour',
            },
            {
                location: 'Kandy',
                date: '2021-09-02',
                time: '11:00',
                duration: '2 hour',
            },
            {
                location: 'Galle',
                date: '2021-09-03',
                time: '12:00',
                duration: '3 hour',
            },
            {
                location: 'Colombo',
                date: '2021-09-01',
                time: '10:00',
                duration: '1 hour',
            },
            {
                location: 'Kandy',
                date: '2021-09-02',
                time: '11:00',
                duration: '2 hour',
            },
            {
                location: 'Galle',
                date: '2021-09-03',
                time: '12:00',
                duration: '3 hour',
            },
            {
                location: 'Colombo',
                date: '2021-09-01',
                time: '10:00',
                duration: '1 hour',
            },
            {
                location: 'Kandy',
                date: '2021-09-02',
                time: '11:00',
                duration: '2 hour',
            },
            {
                location: 'Galle',
                date: '2021-09-03',
                time: '12:00',
                duration: '3 hour',
            },
        ]
    }),
}
</script>