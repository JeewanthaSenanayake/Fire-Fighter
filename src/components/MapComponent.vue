<template>
    <v-container>


        <GoogleMap :api-key="mapApiKey" style="width: 100%; height: 425px; border-radius: 15px;" :center="center"
            :zoom="mapZoom">
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
        <v-btn @click="changeLocations({ lat: 6.9271, lng: 79.8612 }, { lat: 7.0840, lng: 80.0098 })">Test</v-btn>
        <v-btn @click="resetMap">Reset Map</v-btn>
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
        mapApiKey: process.env.VUE_APP_MAP_API_KEY,
        map: null,
        center: { lat: 7.6697, lng: 80.6459 },
        mapZoom: 7.25,
        locations: [
            { lat: 6.9271, lng: 79.8612 }, // 0 index for current location
             // 1 index for destination location
        ],
    }),
    methods: {
        changeLocations(current, destination) {
            this.locations[0] = { lat: current.lat, lng: current.lng };
            this.locations[1] = { lat: destination.lat, lng: destination.lng };
            this.center = { lat: (current.lat + destination.lat) / 2, lng: (current.lng + destination.lng) / 2 };
            this.mapZoom = this.CalculateZoom(current.lat, current.lng, destination.lat, destination.lng);
        },
        resetMap() {
            this.center = { lat: 7.6697, lng: 80.6459 };
            this.locations = [{ lat: 6.9271, lng: 79.8612 }];
            this.mapZoom = 7.25;
        },
        CalculateZoom(lat1, lng1, lat2, lng2) {
            const R = 6371 // radius of earth in km

            const toRadians = (degrees) => degrees * (Math.PI / 180);
            // Differences in latitude and longitude
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lng2 - lng1);

            // Convert latitudes to radians
            const radLat1 = toRadians(lat1);
            const radLat2 = toRadians(lat2);

            // Haversine formula
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(radLat1) * Math.cos(radLat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            // Distance in kilometers
            const distance = R * c;
            const z = (Math.log(40075 / distance)) / (Math.log(2))
            return z;
        }
    },
    mounted() {

    },
    watch: {
        locations: {
            handler: function (val) {
                if (val.length > 1) {
                    this.$emit('locationsStatus', true);
                } else {
                    this.$emit('locationsStatus', false);
                }
            },
            deep: true
        }
    }
}

</script>