import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import FireHistoryView from "@/views/FireHistoryView.vue";


const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: DashboardView
    },
    {
        path: "/fire-history",
        name: "FireHistory",
        component: FireHistoryView
    }
   
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;