import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import FireHistoryView from "@/views/FireHistoryView.vue";
import HelpView from "@/views/HelpView.vue";

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
    },
    {
        path: "/help",
        name: "Help",
        component: HelpView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;