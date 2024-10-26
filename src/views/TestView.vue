<template>
    <div>
        <h1>hg</h1>
        <h1>{{ itemsPerPage }}</h1>
        <h1>{{ items }}</h1>
        <v-btn @click="addFirestoreItem">Firestore</v-btn>
        <v-btn @click="getAddress(7.084, 80.0098)">address</v-btn>
        <v-btn @click="time1">time1</v-btn>
        <v-btn @click="time2">time2</v-btn>
        {{ address }}

        {{ timeData }}
    </div>
</template>

<script>
import { ref, onValue } from "firebase/database";
// import { ref, onValue, set, push } from "firebase/database";
import { database, firestoreDb } from "../firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";
export default {
    name: 'TestView',
    data: () => ({
        itemsPerPage: 5,
        items: [],
        address: {},
        timeData: {
            startTime: null,
            endTime: null,
            date: null
        }
    }),
    mounted() {
        const itemsRef = ref(database, "body_data");
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            this.items = data;
        });
    },
    methods: {
        time1() {
            const now = new Date();
            this.timeData.date = now.toISOString().split('T')[0];
            this.timeData.startTime = now.toTimeString().split(' ')[0];
        },
        time2(){
            const now = new Date();
            this.timeData.endTime=now.toTimeString().split(' ')[0];
        },
        async addFirestoreItem() {
            let newItem = {

                "name": "jeewantha",
                "age": "25",

            }
            const colRef = collection(firestoreDb, "fire_history");
            await addDoc(colRef, { item: newItem });
        },

        async getAddress(lat, lon) {


            await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=8f85d77341f74d6295f7acf31aabbeec`).then((response) => {
                console.log(response.data);
                this.address = {
                    "city": response.data.features[0].properties.city,
                    "state": response.data.features[0].properties.state,
                    "country": response.data.features[0].properties.country
                };
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

}
</script>