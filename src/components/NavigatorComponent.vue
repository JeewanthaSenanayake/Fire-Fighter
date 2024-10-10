<template>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" theme="dark">
        <div class="d-flex justify-center pt-8">
            <v-avatar size="90">
                <v-img alt="fire_logo" :src="require('@/assets/naviLogo.jpg')"></v-img>
            </v-avatar>
        </div>
        <div class="d-flex justify-center pt-2 mb-8">
            <H2>Fire Fighter</H2>
        </div>
        <div class="mt-2 mx-2">
            <v-list v-for="(item, index) in items" :key="index">
                <v-list-item :prepend-icon="item.icon"
                    :title="item.title" :to="item.to">
                    <template #append v-if="pageName == item.title">
                        <v-img :src="require('@/assets/rightBar.png')" height="30px" width="4px" cover style="border-radius: 10px;"></v-img>
                    </template>
                </v-list-item>
            </v-list>
        </div>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'NavigatorComponent',

    components: {

    },
    props: {
        pageName: {
            type: String,
            required: true
        }
    },

    data: () => ({
        drawer: true,
        items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
            { title: 'Fire History', icon: 'mdi-history', to: '/fire-history' },
            { title: 'Help', icon: 'mdi-help', to: '/help' },
        ],
    }),
}
</script>