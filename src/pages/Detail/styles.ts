import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.navy,
    },
    header: {
        zIndex: 10,
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
    },
    headerButton: {
        width: 45,
        height: 46,
        backgroundColor: 'rgba(25, 26, 48, 0.8)',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width: '100%',
        height: '45%',
    },
    buttonLink: {
        backgroundColor: theme.colors.green,
        flexDirection: 'row',
        padding: 12,
        position: 'absolute',
        top: '40%',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        color: theme.colors.white,
        fontSize: 30,
        fontWeight: 'bold',
        padding: 8,
        paddingLeft: 14,
        marginTop: 8,
    },
    contentArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
    },
    rate: {
        color: theme.colors.white,
        fontSize: 18,
        padding: 8,
        marginTop: 8,
    },
    listGenres: {
        paddingLeft: 14,
        marginVertical: 8,
        maxHeight: 35,
        minHeight: 35,
    },
    descriptionTitle: {
        color: theme.colors.white,
        paddingLeft: 14,
        paddingTop: 14,
        fontSize: 22,
        fontWeight: 'bold',
    },
    description: {
        color: theme.colors.white,
        paddingHorizontal: 14,
        lineHeight: 20,
    }
});