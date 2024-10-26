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
import { firestoreDb } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
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
                key: 'address',
            },
            { title: 'Date', key: 'date', align: 'end' },
            { title: 'Time', key: 'startTime', align: 'end' },
            { title: 'Duration', key: 'duration', align: 'end' },
        ],

        tableData: [

        ]
    }),

    methods: {
        async fetchFirestoreItems() {
            const colRef = collection(firestoreDb, "fire_history");
            const snapshot = await getDocs(colRef);
            this.tableData = snapshot.docs.map(doc => doc.data());
        },
        
    },
    async mounted() {
        await this.fetchFirestoreItems();
    }
}
</script>