<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="5" md="5" class="position-relative">
                <v-img src="@/assets/Firefighter1.png" class="firefighter-image" />
            </v-col>
            <v-col cols="7" md="7">
                <v-col class="align-center justify-center">

                    <v-col cols="12" md="12">
                        <v-card style="background-color:rgba(97, 97, 97, 0.5);">

                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <v-img height="70px" :src="heartReate(values.heart_rate)" />
                                    </v-col>
                                    <v-col cols="6">
                                        <h1>{{ values.heart_rate }} bpm</h1>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-card style="background-color:rgba(97, 97, 97, 0.5);">

                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <v-img height="70px" :src="gasValColor(values.air_val)" />
                                    </v-col>
                                    <v-col cols="6">
                                        <h1>{{values.air_val}} ppb</h1>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-card style="background-color:rgba(97, 97, 97, 0.5);">

                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <v-img height="70px" :src="is_man_active(values.is_active)" />
                                    </v-col>
                                    <v-col cols="6">
                                        <h1 v-if="values.is_active">Active</h1>
                                        <h1 v-else>Not Active</h1>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
export default {
    name: 'FirefighterData',
    data: () => ({
        values: {
        },
        
    }),
    methods: {
        getPosition(position) {
            // Customize these values according to your image and design.
            const positions = {
                'top-left': { top: '20px', left: '20px' },
                'top-right': { top: '20px', right: '20px' },
                'bottom-left': { bottom: '20px', left: '20px' },
                'bottom-right': { bottom: '20px', right: '20px' }
            };
            return { position: 'absolute', ...positions[position] };
        },
        heartReate(val){
            if(val>=60 && val<=100){
                return require('@/assets/fireDataImg/heart_green.png')
            }else if(val>100 && val<=120 || val>=50 && val<60){
                return require('@/assets/fireDataImg/heart_yellow.png')
            }else if(val>120 || val<50){
                return require('@/assets/fireDataImg/heart_red.png')
            }
        },
        is_man_active(val){
            if(val){
                return require('@/assets/fireDataImg/man_active.png')
            }else{
                return require('@/assets/fireDataImg/man_no_active.png')
            }
        },
        gasValColor(val){
            if(val>=0 && val<=100){
                return require('@/assets/fireDataImg/gas_green.png')
            }else if(val>100 && val<=200 || val>=0 && val<100){
                return require('@/assets/fireDataImg/gas_yellow.png')
            }else if(val>200 || val<0){
                return require('@/assets/fireDataImg/gas_red.png')
            }
        }
    },
    mounted() {
        const itemsRef = ref(database, "body_data");
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            this.values = data;
        });
    }

}
</script>
<style scoped>
.firefighter-image {
    width: 100%;
    max-height: 600px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
}

.value-box {
    position: absolute;
}

/* Styling for SVG arrows */
.arrows {
    pointer-events: none;
    /* Ensures the arrows don't block other elements */
}
</style>