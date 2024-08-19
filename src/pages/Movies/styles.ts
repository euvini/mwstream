import { StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
        paddingTop: 30,
        paddingBottom: 30,
    },
    listMovies: {
        marginLeft: 4,
    },
});