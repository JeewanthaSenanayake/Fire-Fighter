<template>
    <v-container>
        
        
        <GoogleMap :api-key="mapApiKey" style="width: 500px; height: 500px; border-radius: 15px;"
            :center="center" :zoom="7">
            <MarkerCluster>
                <CustomMarker v-for="(location, i) in locations" :key="i" :options="{ position: location }">
                    <div style="text-align: center">
                        <img v-if="i == 0" :src="require('@/assets/clocation.png')" width="25" height="25"
                            style="margin-top: 8px" />
                        <img v-else :src="require('@/assets/loc_red.png')" width="25" height="25" />
                    </div>
                </CustomMarker>
            </MarkerCluster>

        </GoogleMap>
    </v-container>
</template>
<script>
import { GoogleMap, CustomMarker, MarkerCluster } from 'vue3-google-map'
export default {
    name: 'MapComponent',
    components: {
        GoogleMap,
        MarkerCluster,
        CustomMarker
    },
    data: () => ({
        mapApiKey : process.env.VUE_APP_MAP_API_KEY,
        map: null,
        center: { lat: 7.6697, lng: 80.6459 },
        locations: [
            { lat: 6.9271, lng: 79.8612 }, // 0 index for current location
            { lat: 7.4818, lng: 80.3609 }, // 1 index for destination location
        ],
    }),
    methods: {
        changeLocations(current, destination) {
            this.locations[0] = { lat: current.lat, lng: current.lng };
            this.locations[1] = { lat: destination.lat, lng: destination.lng };
            this.center = { lat: (current.lat + destination.lat) / 2, lng: (current.lng + destination.lng) / 2 };
        }
    },
    mounted() {

    },
}

</script>