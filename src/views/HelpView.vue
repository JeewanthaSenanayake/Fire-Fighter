<template>
    <div>
        <NavigatorComponent  pageName="Help" />
        <v-container class="svg-background">
            <svg class="background-svg" viewBox="0 0 500 500">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" style="stop-color: #28A745; stop-opacity: 1" /> <!-- Green -->
                        <stop offset="60%" style="stop-color: #FFA500; stop-opacity: 1" /> <!-- Orange -->
                        <stop offset="90%" style="stop-color: #007BFF; stop-opacity: 1" /> <!-- Blue -->
                    </linearGradient>
                </defs>
                <circle cx="100" cy="10" r="100" fill="url(#gradient1)" />
                <circle cx="575" cy="55" r="150" fill="url(#gradient1)" />
                <circle cx="275" cy="400" r="150" fill="url(#gradient1)" />
            </svg>
            <v-card style="background-color: rgba(66, 66, 66, 0.7); border-radius: 15px; height: 100vh;" class="pa-2">
                <h1 class="text-center my-3" style="color: white;">Help</h1>

                <v-card class="ma-3 pa-3" style="border-radius: 15px; background-color: rgba(97, 97, 97, 0.7);">
                    <!-- <HistryTable :headers="headers" :tableData="tableData" /> -->
                </v-card>
            </v-card>
        </v-container>
    </div>
    
</template>

<script>
import NavigatorComponent from '@/components/NavigatorComponent.vue';
export default {
    name: 'HelpView',
    components: {
        NavigatorComponent
    },
    data: () => ({
        //
    }),
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