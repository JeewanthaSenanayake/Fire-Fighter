<template>
    <div>
        <NavigatorComponent pageName="Dashboard" />
        <v-container>
            <v-card style="background-color: #424242; border-radius: 15px; height: 100vh;" class="pa-2">
                <h1 class="text-center mt-3" style="color: white;">Fire Dashboard</h1>
                <v-row class="mt-4 pb-3">
                    <v-col cols="7" class="ml-4 mr-4">
                        <v-card style="border-radius: 15px; background-color: #616161;">
                            <div v-if="mapShow">
                                <v-row class="mt-3 pl-7 mb-1">
                                    <v-chip v-if="fireStatus == false" color="green-accent-4"
                                        class="text-white px-2 py-1" density="compact" variant="flat">No any fire
                                        alert</v-chip>
                                    <v-chip v-else color="red-accent-4" class="text-white px-2 py-1" density="compact"
                                        variant="flat">Fire alert</v-chip>
                                </v-row>
                                <div>
                                    <MapComponent @locationsStatus=locationsStatusEmit />
                                </div>
                            </div>
                            <div v-else :class="['blur-transition', { 'is-clear': isClear }]">
                                <FirefighterData />
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="4" class="ml-4">
                        <v-card style="border-radius: 15px; background-color: #616161;">
                            <v-row style="color: white;"
                                class="mt-3 mr-4 ml-4 mb-1 d-flex justify-space-between align-center">
                                Fire History
                                <router-link to="/fire-history">View All</router-link>
                            </v-row>
                            <v-card-text v-for="(fire_history, i) in historyData" :key="i">
                                <h5 style="color:#E0E0E0;">{{ fire_history.location }}</h5>
                                <p style="color:#BDBDBD">{{ fire_history.date }}</p>
                                <hr>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>


</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import NavigatorComponent from '@/components/NavigatorComponent.vue';
import FirefighterData from '@/components/FirefighterData.vue';
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
export default {
    name: 'DashboardView',
    components: {
        NavigatorComponent,
        MapComponent,
        FirefighterData
    },
    data: () => ({
        isClear: false,
        historyData: [
            { location: 'Maharagama, Colombo', date: '08.09.2024' },
            { location: 'Kandy', date: '08.09.2024' },
            { location: 'Galle', date: '08.09.2024' },
            { location: 'Kurunegala', date: '08.09.2024' },
            { location: 'Anuradhapura', date: '08.09.2024' },
            { location: 'Jaffna', date: '08.09.2024' },
        ],
        mapShow: true,
        fireStatus: false
    }),
    methods: {
        locationsStatusEmit(status) {
            this.fireStatus = status;
        }
    },
    watch: {
        mapShow: {
            handler: function (value) {
                if (value == false) {
                    setTimeout(() => {
                        this.isClear = true;
                    }, 100); // small delay to ensure the transition is visible
                }else{
                    this.isClear=false;
                }
            },
            deep: true
        }
    },
    mounted(){
        const itemsRef = ref(database, "is_fighter_ard");
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            this.mapShow = !data ;
        });
    }
}
</script>

<style scoped>
.blur-transition {
    /* Initial state: blurred */
    filter: blur(10px);
    transition: filter 2s ease-out;
    /* Adjust the duration as needed */
}

.is-clear {
    /* Final state: no blur */
    filter: blur(0px);
}
</style>