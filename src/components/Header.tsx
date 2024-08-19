import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/theme";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const navigation: any = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={36} color={theme.colors.white} />
            </TouchableOpacity>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 14,
        gap: 16
    },
    menuButton: {
        height: 70,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        color: theme.colors.white,
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 14,
    },
});