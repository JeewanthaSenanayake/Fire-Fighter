<template>
    <div>
        <v-data-table  :items-per-page="7" :headers="headers" :items="tableData"
        class="elevation-1"></v-data-table >
    </div>
</template>

<script>
export default {
    name: 'HistryTable',
    props: {
        headers: {
            type: Array,
            required: true,
        },
        tableData: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        itemsPerPage: 5,
    }),
}
</script>