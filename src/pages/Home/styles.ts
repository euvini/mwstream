import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.navy,
        paddingTop: 30,
        paddingBottom: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 8,
        marginTop: 10,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '85%',
        height: 50,
        borderRadius: 50,
        paddingHorizontal: 15,
        fontSize: 18,
        color: theme.colors.white,
    },
    searchButton: {
        width: '15%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: 20,
        paddingBottom: 8,
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.white,
        paddingHorizontal: 14,
    },
    bannerButton: {},
    banner: {
        height: 190,
        marginHorizontal: 14,
    },
    sliderMovie: {
        height: 250,
        paddingHorizontal: 14,
    },
});