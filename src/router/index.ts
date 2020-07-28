import HomePage from "../pages/home";
import CalendarPage from "../pages/calendar";
import SettingsPage from "../pages/settings";

const routes = [
    {
        path: "/calendar",
        component: CalendarPage
    },
    {
        path: "/settings",
        component: SettingsPage
    },
    {
        path: "",
        component: HomePage
    }
]


export default routes;
