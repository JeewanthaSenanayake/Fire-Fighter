<template>
    <div>
        <h1>hg</h1>
        <h1>{{ itemsPerPage }}</h1>
        <h1>{{ items }}</h1>
    </div>
</template>

<script>
import { ref, onValue } from "firebase/database";
// import { ref, onValue, set, push } from "firebase/database";
import { database } from "../firebase";
export default {
    name: 'TestView',
    data: () => ({
        itemsPerPage: 5,
        items: [],
    }),
    mounted() {
        const itemsRef = ref(database, "body_data");
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            this.items = data ;
        });
    }

}
</script>