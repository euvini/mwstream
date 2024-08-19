import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from '@expo/vector-icons';
import Stars from 'react-native-stars';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { saveMovie, hasMovie, deleteMovie } from "../../utils/storage";
import Genres from "../../components/Genres";
import { styles } from "./styles";
import { StackNavigationProps, StackRouteProps } from "../../types/types";
import { getMovieDetail, getTVSerieDetail } from "../../services/requests";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme/theme";
import { VideoComponent } from "../../components/Video";

interface SavedProps {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    overview: string;
    homepage: string;
    type: 'tv' | 'movie';
}

export default function Detail() {
    const navigation = useNavigation<StackNavigationProps<'Detail'>>();
    const route = useRoute<StackRouteProps<'Detail'>>();

    const [movie, setMovie] = useState<SavedProps | null>(null);
    const [favoritedMovie, setFavoritedMovie] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    const { t } = useTranslation()

    useEffect(() => {
        let isMounted = true;

        const fetchMovie = async () => {
            try {
                if (route.params.type === 'movie') {
                    const response = await getMovieDetail(route.params?.id)

                    if (isMounted) {
                        let data: SavedProps = response.data

                        setMovie({ ...data, type: route.params.type });
                        const isFavorite = await hasMovie(data);
                        setFavoritedMovie(isFavorite);
                    }
                }

                if (route.params.type === 'tv') {
                    const response = await getTVSerieDetail(route.params?.id)

                    if (isMounted) {
                        let data: SavedProps = response.data

                        setMovie({ ...data, type: route.params.type });
                        const isFavorite = await hasMovie(data);
                        setFavoritedMovie(isFavorite);
                    }
                }

            } catch (error) {
                console.error('Failed to fetch movie', error);
            }
        };

        fetchMovie();

        return () => {
            isMounted = false;
        };
    }, [route.params?.id]);

    async function handleFavoriteMovie(movie: SavedProps) {
        if (favoritedMovie) {
            await deleteMovie(movie.id);
            setFavoritedMovie(false);
            alert(t('removed'));
        } else {
            await saveMovie('@movi.e', movie);
            setFavoritedMovie(true);
            alert(t('saved'));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color={theme.colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton} onPress={() => handleFavoriteMovie(movie!)}>
                    {favoritedMovie ? (
                        <Ionicons name="bookmark" size={28} color={theme.colors.white} />
                    ) : (
                        <Ionicons name="bookmark-outline" size={28} color={theme.colors.white} />
                    )}
                </TouchableOpacity>
            </View>
            {movie && (
                <>
                    {
                        showTrailer && (<VideoComponent onClose={() => setShowTrailer(false)} />)
                    }
                    <Image
                        style={styles.banner}
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }}
                    />
                    <TouchableOpacity style={styles.buttonLink} onPress={() => setShowTrailer(!showTrailer)} activeOpacity={0.7}>
                        <Feather name="play" size={24} color={theme.colors.white} />
                        <Text style={[styles.description, { fontSize: 16, fontWeight: '700' }]}>{t("watchMovie")}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title} numberOfLines={2}>{movie?.title ?? movie?.name}</Text>
                    <View style={styles.contentArea}>
                        <Stars
                            default={movie.vote_average}
                            count={10}
                            half
                            starSize={20}
                            fullStar={<Ionicons name="star" size={24} color={theme.colors.marigold} />}
                            emptyStar={<Ionicons name="star-outline" size={24} color={theme.colors.marigold} />}
                            halfStar={<Ionicons name="star-half" size={24} color={theme.colors.marigold} />}
                            disabled
                        />
                        <Text style={styles.rate}>{movie.vote_average?.toFixed(1)}</Text>
                    </View>
                    <ScrollView horizontal style={styles.listGenres} showsHorizontalScrollIndicator={false}>
                        {movie.genres.map((genre) => (
                            <Genres key={genre.id} data={genre} />
                        ))}
                    </ScrollView>
                    {
                        movie?.overview && (
                            <ScrollView>
                                <Text style={styles.descriptionTitle}>{t("description")}</Text>
                                <Text style={styles.description}>{movie.overview}</Text>
                            </ScrollView>
                        )
                    }
                </>
            )}
        </View>
    );
}

