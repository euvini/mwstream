import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { getMoviesSave, deleteMovie } from '../../utils/storage';
import FavoriteItem from '../../components/FavoriteItem';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { StackNavigationProps } from '../../types/types';
import { theme } from '../../theme/theme';

export default function Movies() {
    const navigation = useNavigation<StackNavigationProps<'Movies'>>();
    const isFocused = useIsFocused();
    const { t } = useTranslation();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function fetchMovies() {
            try {
                const result = await getMoviesSave('@movi.e');
                if (isActive) {
                    setMovies(result);
                }
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                if (isActive) setLoading(false);
            }
        }

        fetchMovies();

        return () => {
            isActive = false;
        };
    }, [isFocused]);

    const handleDelete = async (id: string) => {
        try {
            const updatedMovies = await deleteMovie(id);
            setMovies(updatedMovies);
        } catch (error) {
            console.error("Failed to delete movie:", error);
        }
    };

    const navigateDetailsPage = (item: { id: string, type: 'tv' | 'movie' }) => {
        navigation.navigate('Detail', { id: item.id, type: item.type });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.white} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title={t("mymovies")} />
            <FlatList
                style={styles.listMovies}
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <FavoriteItem
                        data={item}
                        deleteMovie={handleDelete}
                        navigatePage={() => navigateDetailsPage(item)}
                    />
                )}
            />
        </View>
    );
}