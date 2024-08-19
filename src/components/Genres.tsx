import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme/theme";

interface GenresProps {
    data: {
        name: string;
    };
}

export default function Genres({ data }: GenresProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 8,
        backgroundColor: theme.colors.eggCream,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    name: {
        fontSize: 14,
        color: theme.colors.black,
        fontWeight: '600'
    },
});