<template>
    <v-container>
        {{ historyData }}
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
    </v-container>
</template>
<script>
import { GoogleMap, CustomMarker, MarkerCluster } from 'vue3-google-map'

export default {
    name: 'MapComponent',
    props:[
        'locations',
        'mapZoom',
        'center'
    ],
    components: {
        GoogleMap,
        MarkerCluster,
        CustomMarker
    },
    data: () => ({
        mapApiKey: process.env.VUE_APP_MAP_API_KEY,
    }),
    
}

</script>