import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import { theme } from "../theme/theme";

interface FavoriteItemProps {
    data: {
        id: string;
        title?: string;
        name?: string;
        vote_average: number;
    };
    deleteMovie: (id: string) => void;
    navigatePage: (data: any) => void;
}

export default function FavoriteItem({ data, deleteMovie, navigatePage }: FavoriteItemProps) {
    const { t } = useTranslation()
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontSize: 22 }]}>{data?.title ?? data?.name}</Text>

            <View style={styles.rateContainer}>
                <Ionicons name="star" size={12} color={theme.colors.marigold} />
                <Text style={styles.rate}>{data.vote_average?.toFixed(1)}</Text>
            </View>

            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.detailButton} onPress={() => navigatePage(data)}>
                    <Text style={[styles.title, { fontSize: 14 }]}>{t("viewDetails")}</Text>
                </TouchableOpacity>

                <TouchableOpacity testID="delete-button" style={styles.deleteButton} onPress={() => deleteMovie(data.id)}>
                    <Feather name="trash" size={24} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    title: {
        color: theme.colors.white,
        fontWeight: "bold",
    },
    rateContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    rate: {
        color: theme.colors.white,
        fontSize: 12,
        paddingLeft: 4,
    },
    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    detailButton: {
        width: "85%",
        height: 30,
        backgroundColor: theme.colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
    deleteButton: {
        width: "15%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});