<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6" class="position-relative">

                <v-img src="@/assets/Firefighter1.png" class="firefighter-image" />

                <!-- SVG for Arrows -->
                <svg class="arrows" width="100%" height="100%" style="position:absolute; top:0; left:0;">
                    <!-- Top right arrow -->
                    <line x1="75%" y1="7%" x2="60%" y2="15%" stroke="white" stroke-width="2"
                        marker-end="url(#arrowhead)" />
                    <line x1="175%" y1="7%" x2="75%" y2="7%" stroke="white" stroke-width="2" />

                    <!-- Midle right arrow -->
                    <line x1="85%" y1="48%" x2="65%" y2="38%" stroke="white" stroke-width="2"
                        marker-end="url(#arrowhead)" />
                    <line x1="175%" y1="48%" x2="85%" y2="48%" stroke="white" stroke-width="2" />

                    <!-- Bottum right arrow -->
                    <line x1="85%" y1="90%" x2="65%" y2="82%" stroke="white" stroke-width="2"
                        marker-end="url(#arrowhead)" />
                    <line x1="175%" y1="90%" x2="85%" y2="90%" stroke="white" stroke-width="2" />

                    <!-- Midle Left arrow -->
                    <line x1="10%" y1="50%" x2="30%" y2="40%" stroke="white" stroke-width="2"
                        marker-end="url(#arrowhead)" />
                    <line x1="10%" y1="50%" x2="0%" y2="50%" stroke="white" stroke-width="2" />
                    
                    
                    <!-- Arrowhead marker -->
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                        </marker>
                    </defs>
                </svg>


                <div class="value-box" style="left:100%; top:4%">
                    <v-chip color="green-accent-4" class="text-white" density="compact" variant="flat">{{
                        values.topRight }}</v-chip>
                </div>
                <div class="value-box" style="left:100%; top:45%">
                    <v-chip color="red-accent-4" class="text-white" density="compact" variant="flat">{{
                        values.midleRight }}</v-chip>
                </div>
                <div class="value-box" style="left:100%; top:87%">
                    <v-chip color="green-accent-4" class="text-white" density="compact" variant="flat">{{
                        values.bottomRight }}</v-chip>
                </div>
                <div class="value-box" style="left:-14%; top:47%">
                    <v-chip color="green-accent-4" class="text-white" density="compact" variant="flat">{{
                        values.bottomLeft }}</v-chip>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'FirefighterData',
    data: () => ({
        values: {
            midleRight: 75,
            topRight: 30,
            bottomLeft: 50,
            bottomRight: 45
        },
        humanPoints: {
            topLeft: { x: 100, y: 100 },
            topRight: { x: 250, y: 100 },
            bottomLeft: { x: 100, y: 400 },
            bottomRight: { x: 250, y: 400 }
        }
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
        }
    },
    mounted() {
        // setInterval(() => {
        //     this.values.topLeft = Math.floor(Math.random() * 100);
        //     this.values.topRight = Math.floor(Math.random() * 100);
        //     this.values.bottomLeft = Math.floor(Math.random() * 100);
        //     this.values.bottomRight = Math.floor(Math.random() * 100);
        // }, 2000);
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