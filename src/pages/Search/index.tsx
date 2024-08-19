import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api, { key } from '../../services/api';
import SearchItem from '../../components/SearchItem';
import { styles } from './styles';
import { StackNavigationProps, StackRouteProps } from '../../types/types';
import { theme } from '../../theme/theme';

export default function Search() {
    const navigation = useNavigation<StackNavigationProps<"Search">>();
    const route = useRoute<StackRouteProps<'Search'>>();

    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function getSearchMovies() {
            try {
                const response = await api.get('/search/movie', {
                    params: {
                        query: route?.params?.name,
                        api_key: key,
                        language: 'pt-br',
                        page: 1,
                    },
                });

                if (isActive) {
                    setMovies(response.data.results);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        getSearchMovies();

        return () => {
            isActive = false;
        };
    }, [route.params?.name]);

    function handleNavigationDetailsPage(item: any) {
        navigation.navigate('Detail', { id: item.id, type: 'movie' });
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.white} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <SearchItem data={item} navigatePage={() => handleNavigationDetailsPage(item)} />
                )}
            />
        </View>
    );
}