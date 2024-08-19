import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import { theme } from "../theme/theme";

interface SearchItemProps {
    data: {
        title: string;
        release_date: string;
        backdrop_path?: string;
        vote_average: number;
    };
    navigatePage: (data: any) => void;
}

export default function SearchItem({ data, navigatePage }: SearchItemProps) {
    const { t } = useTranslation()
    function DetailMovie() {
        if (data.release_date === '') {
            alert(t('movieWithoutDate'));
            return;
        }

        navigatePage(data);
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={DetailMovie}>
            {data?.backdrop_path ? (
                <Image
                    style={styles.banner}
                    resizeMethod="resize"
                    source={{ uri: `https://image.tmdb.org/t/p/original${data?.backdrop_path}` }}
                />
            ) : (
                <Image
                    style={styles.banner}
                    resizeMethod="resize"
                    source={require('../../assets/nophoto.png')}
                />
            )}
            <Text style={styles.title}>{data?.title}</Text>

            <View style={styles.rateContainer}>
                <Ionicons name="star" size={12} color={theme.colors.marigold} />
                <Text style={styles.rate}>{data?.vote_average?.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    banner: {
        width: "100%",
        height: 180,
    },
    title: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 8,
    },
    rateContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 4,
    },
    rate: {
        paddingLeft: 4,
        color: theme.colors.white,
        fontSize: 12,
    },
});