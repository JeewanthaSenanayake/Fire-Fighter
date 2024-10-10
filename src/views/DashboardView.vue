<template>
    <div>
        <NavigatorComponent pageName="Dashboard" />
        <v-container>
            <v-card style="background-color: #424242; border-radius: 15px;" class="pa-2">
                <h1 class="text-center mt-3" style="color: white;">Fire Dashboard</h1>
                <v-row>
                    <v-col cols="7" class="ml-5 mr-3">
                        <v-card>
                            <MapComponent class="justify-center" />
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card>
                            <p>history</p>
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
export default {
    name: 'DashboardView',
    components: {
        NavigatorComponent,
        MapComponent,
    },
}
</script>