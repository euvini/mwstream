import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StackRoutes from "./stackRoutes";
import Movies from "../pages/Movies";
import { theme } from "../theme/theme";
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

export default function Routes() {
    const { t } = useTranslation()
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: theme.colors.black,
                paddingTop: 20,
            },
            drawerActiveBackgroundColor: theme.colors.navy,
            drawerActiveTintColor: theme.colors.white,
            drawerInactiveTintColor: theme.colors.white,

        }}>
            <Drawer.Screen name="HomeDrawer" component={StackRoutes}
                options={{
                    title: t("home"),
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'movie-open' : 'movie-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }} />
            <Drawer.Screen name="Movies" component={Movies}
                options={{
                    title: t("myMovies"),
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'archive' : 'archive-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }} />
        </Drawer.Navigator>
    )
}