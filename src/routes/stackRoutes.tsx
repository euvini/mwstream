import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import { theme } from "../theme/theme";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    const { t } = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title: t("search"),
                    headerTintColor: theme.colors.white,
                    headerTitleStyle: {
                        color: theme.colors.navy
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.black
                    }
                }}
            />
        </Stack.Navigator>
    )
}