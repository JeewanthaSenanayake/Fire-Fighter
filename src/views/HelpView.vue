<template>
    <div>
        <NavigatorComponent  pageName="Help" />
        <v-container>
            <h1>Help</h1>
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