import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import { styles } from './styles';
import { StackNavigationProps } from '../../types/types';
import { getNowPlaying, getPopularMovies, getPopularTVSeries, getTopRatedMovies, getTopRatedTVSeries } from '../../services/requests';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme/theme';

type Props = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};


export default function Home() {
    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTVSeries, setPopularTVSeries] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [topTVSeriesList, setTopTVSeriesList] = useState([]);

    const [bannerMovie, setBannerMovie] = useState<Props>();
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');

    const { t } = useTranslation()

    const navigation = useNavigation<StackNavigationProps<'Home'>>();

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

        const SIZE = 15

        async function getMovies() {
            try {
                const [nowData, popularData, topMovieData, popularSeries, topTVSeriesData] = await Promise.all([
                    getNowPlaying(),
                    getPopularMovies(),
                    getTopRatedMovies(),
                    getPopularTVSeries(),
                    getTopRatedTVSeries()
                ]);

                if (isActive) {
                    const nowList = getListMovies(SIZE, nowData.data.results);
                    const popularMoviesList = getListMovies(SIZE, popularData.data.results);
                    const popularSeriesList = getListMovies(SIZE, popularSeries.data.results);
                    const topMovieList = getListMovies(SIZE, topMovieData.data.results);
                    const topTVSeriesList = getListMovies(SIZE, topTVSeriesData.data.results);

                    setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);

                    setNowMovies(nowList);
                    setPopularMovies(popularMoviesList);
                    setTopMovies(topMovieList);
                    setPopularTVSeries(popularSeriesList);
                    setTopTVSeriesList(topTVSeriesList);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getMovies();

        return () => {
            isActive = false;
            ac.abort();
        };
    }, []);

    function navigateMovieDetailPage(item: { id?: any; }) {
        navigation.navigate('Detail', { id: item.id, type: 'movie' });
    }

    function navigateTVSerieDetailPage(item: { id?: any; }) {
        navigation.navigate('Detail', { id: item.id, type: 'tv' });
    }

    function handleSearchMovie() {
        if (input.trim() === '') return;

        navigation.navigate('Search', { name: input });
        setInput('');
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
            <Header title="MW Stream" />
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder={t("searchForAMovie")}
                    placeholderTextColor={theme.colors.white}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSearchMovie} style={styles.searchButton}>
                    <Feather name="search" size={30} color={theme.colors.white} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{t("nowPlaying")}</Text>
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigateMovieDetailPage(bannerMovie)} style={styles.bannerButton}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: `https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}` }}
                        style={styles.banner}
                    />
                </TouchableOpacity>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateMovieDetailPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                    style={styles.sliderMovie}
                />

                <Text style={styles.title}>{t("popularMovies")}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateMovieDetailPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                    style={styles.sliderMovie}
                />

                <Text style={styles.title}>{t("topRatedMovies")}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateMovieDetailPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                    style={styles.sliderMovie}
                />

                <Text style={styles.title}>{t("popularSeries")}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={popularTVSeries}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateTVSerieDetailPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                    style={styles.sliderMovie}
                />

                <Text style={styles.title}>{t("topRatedSeries")}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={topTVSeriesList}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateTVSerieDetailPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                    style={styles.sliderMovie}
                />
            </ScrollView>
        </View>
    );
}

