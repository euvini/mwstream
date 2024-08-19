import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../theme/theme";

interface SliderItemProps {
    data: {
        poster_path: string;
        title?: string;
        name?: string;
        vote_average: number;
    };
    navigatePage: (data: any) => void;
}

export default function SliderItem({ data, navigatePage }: SliderItemProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => navigatePage(data)}
            testID="slider-item-touchable"
        >
            <Image
                style={styles.bannerItem}
                source={{ uri: `https://image.tmdb.org/t/p/original${data.poster_path}` }}
                testID="slider-item-image"
            />
            <Text style={styles.title} numberOfLines={2}>{data.title ?? data.name}</Text>
            <View style={styles.rateContainer}>
                <Ionicons name="star" size={12} color={theme.colors.marigold} />
                <Text style={styles.rate}>{data.vote_average?.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        width: 140,
        height: 180,
    },
    bannerItem: {
        width: "100%",
        height: 170,
    },
    title: {
        color: theme.colors.white,
        fontSize: 14,
        paddingTop: 8,
    },
    rateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rate: {
        paddingLeft: 4,
        color: theme.colors.white,
        fontSize: 12,
    },
});