<template>
    <div>
        <NavigatorComponent pageName="Dashboard" />
        <v-container>
            <v-card style="background-color: #424242; border-radius: 15px;" class="pa-2">
                <h1 class="text-center mt-3" style="color: white;">Fire Dashboard</h1>
                <v-row class="mt-4 pb-3">
                    <v-col cols="7" class="ml-4 mr-4">
                        <v-card style="border-radius: 15px; background-color: #616161;">
                            <div v-if="mapShow">
                                <v-row class="mt-3 pl-7 mb-1">
                                    <v-chip color="green-accent-4" class="text-white px-2 py-1" density="compact" variant="flat">No any fire alert</v-chip>
                                </v-row>
                                <div>
                                    <MapComponent />
                                </div>
                            </div>
                            <div v-else>
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
export default {
    name: 'DashboardView',
    components: {
        NavigatorComponent,
        MapComponent,
        FirefighterData
    },
    data: () => ({
        historyData: [
            { location: 'Maharagama, Colombo', date: '08.09.2024' },
            { location: 'Kandy', date: '08.09.2024' },
            { location: 'Galle', date: '08.09.2024' },
            { location: 'Kurunegala', date: '08.09.2024' },
            { location: 'Anuradhapura', date: '08.09.2024' },
            { location: 'Jaffna', date: '08.09.2024' },
        ],
        mapShow: true
    }),
}
</script>