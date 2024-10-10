<template>
    <div>
        <NavigatorComponent :pageName="`Fire History`" />
        <v-container>

            <h1>History</h1>
            
        </v-container>
    </div>
</template>

<script>
import NavigatorComponent from '@/components/NavigatorComponent.vue';
export default {
    name: 'FireHistoryView',

    components: {
        NavigatorComponent
    },

    data: () => ({
        //
    }),
}
</script>