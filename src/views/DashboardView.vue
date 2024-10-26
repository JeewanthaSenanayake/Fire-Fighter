<template>
    <div>
        <NavigatorComponent pageName="Dashboard" />
        <v-container class="svg-background">
            <svg class="background-svg" viewBox="0 0 500 500">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" style="stop-color: #28A745; stop-opacity: 1" /> <!-- Green -->
                        <stop offset="60%" style="stop-color: #FFA500; stop-opacity: 1" /> <!-- Orange -->
                        <stop offset="90%" style="stop-color: #007BFF; stop-opacity: 1" /> <!-- Blue -->
                    </linearGradient>
                </defs>
                <circle cx="100" cy="10" r="100" fill="url(#gradient1)"  />
                <circle cx="575" cy="55" r="150" fill="url(#gradient1)"  />
                <circle cx="275" cy="400" r="150" fill="url(#gradient1)"  />
            </svg>
            <v-card style="background-color: rgba(66, 66, 66, 0.7); border-radius: 15px; height: 100vh;" class="pa-2">
                <h1 class="text-center mt-3" style="color: white;">Fire Dashboard</h1>
                <v-row class="mt-4 pb-3">
                    <v-col cols="7" class="ml-4 mr-4">
                        <v-card style="border-radius: 15px; background-color:rgba(97, 97, 97, 0.7);">
                            <div v-if="mapShow">
                                <v-row class="mt-3 pl-7 mb-1">
                                    <v-chip v-if="fireStatus == false" color="green-accent-4"
                                        class="text-white px-2 py-1" density="compact" variant="flat">No any fire
                                        alert</v-chip>
                                    <v-chip v-else color="red-accent-4" class="text-white px-2 py-1" density="compact"
                                        variant="flat">Fire alert</v-chip>
                                </v-row>

                                <div>
                                    <MapComponent :center="center" :mapZoom="mapZoom" :locations="locations" />
                                </div>
                            </div>
                            <div v-else :class="['blur-transition', { 'is-clear': isClear }]">
                                <FirefighterData />
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="4" class="ml-4">
                        <v-card style="border-radius: 15px; background-color: rgba(97, 97, 97, 0.7);">
                            <v-row style="color: white;"
                                class="mt-3 mr-4 ml-4 mb-1 d-flex justify-space-between align-center">
                                Fire History
                                <router-link to="/fire-history">View All</router-link>
                            </v-row>
                            <v-card-text v-for="(fire_history, i) in historyDataTable.slice(0, 6)" :key="i">
                                <h5 style="color:#E0E0E0;">{{ fire_history.address }}</h5>
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
import { database, firestoreDb } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import axios from "axios";
export default {
    name: 'DashboardView',
    components: {
        NavigatorComponent,
        MapComponent,
        FirefighterData
    },
    data: () => ({
        isClear: false,
        historyDataTable: [
        ],
        mapShow: true,
        fireStatus: false,

        fireLocation: {},
        address: {},
        historyData: {
            startTime: null,
            endTime: null,
            date: null,
            address: null,
        },

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
        },
        async getAddress(lat, lon) {
            await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=8f85d77341f74d6295f7acf31aabbeec`).then((response) => {
                // console.log(response.data);
                this.address = {
                    "city": response.data.features[0].properties.city,
                    "state": response.data.features[0].properties.state,
                    "country": response.data.features[0].properties.country
                };
            })
                .catch((error) => {
                    console.log(error);
                });
        },
        startTimeFun() {
            const now = new Date();
            this.historyData.date = now.toISOString().split('T')[0];
            this.historyData.startTime = now.toTimeString().split(' ')[0];
        },
        endTimeFun() {
            const now = new Date();
            this.historyData.endTime = now.toTimeString().split(' ')[0];
        },
        async addFirestoreItem(newItem) {

            const colRef = collection(firestoreDb, "fire_history");
            await addDoc(colRef, newItem);
        },

        async fetchFirestoreItems() {
            const colRef = collection(firestoreDb, "fire_history");
            const snapshot = await getDocs(colRef);
            this.historyDataTable = snapshot.docs.map(doc => doc.data());
        }
    },

    async created() {
        await this.fetchFirestoreItems();
    },

    mounted() {
        const itemsRef = ref(database, "is_fighter_ard");
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            this.mapShow = !data;
        });
        const itemsRef1 = ref(database, "is_fire");
        onValue(itemsRef1, (snapshot) => {
            const data = snapshot.val();
            this.fireStatus = data;
        });

        const itemsRef2 = ref(database, "location");
        onValue(itemsRef2, (snapshot) => {
            const data = snapshot.val();
            this.fireLocation = data;
        });
    },
    watch: {
        mapShow: {
            handler: async function (value) {
                if (value == false) {
                    setTimeout(() => {
                        this.isClear = true;
                    }, 100); // small delay to ensure the transition is visible
                } else {
                    this.isClear = false;
                    await this.fetchFirestoreItems();
                }
            },
            deep: true
        },
        fireStatus: {
            handler: async function (value) {
                if (value) {
                    this.changeLocations(this.locations[0], this.fireLocation);
                    this.startTimeFun();
                    await this.getAddress(this.fireLocation.lat, this.fireLocation.lng);
                } else {
                    this.resetMap();
                    this.endTimeFun();
                    this.historyData.address = `${this.address.city}, ${this.address.state}, ${this.address.country}`
                    await this.addFirestoreItem(this.historyData);
                }
            },
            deep: true
        }
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
