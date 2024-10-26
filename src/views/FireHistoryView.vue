<template>
    <div>
        <NavigatorComponent :pageName="`Fire History`" />
        <v-container class="svg-background">
            <svg class="background-svg" viewBox="0 0 500 500">
                <circle cx="100" cy="100" r="80" fill="rgba(255, 69, 0)" />
                <circle cx="400" cy="150" r="100" fill="rgba(255, 255, 0)" />
                <circle cx="250" cy="400" r="150" fill="rgba(255, 165, 0)" />
            </svg>
            <v-card style="background-color: rgba(66, 66, 66, 0.7); border-radius: 15px; height: 100vh;" class="pa-2">
                <h1 class="text-center my-3" style="color: white;">Fire Dashboard</h1>

                <v-card class="ma-3 pa-3" style="border-radius: 15px; background-color: rgba(97, 97, 97, 0.7);">
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

<style scoped>


.svg-background {
    position: relative;
    /* Establish positioning context */
    padding: 20px;
    /* Space for content */
    color: black;
    /* Text color */
}

.background-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    /* Make sure SVG is behind content */
}
</style>