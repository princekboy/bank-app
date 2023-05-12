import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5
    },
    card: {
        border: 3
    },
    cardBody: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        padding: 10,
        backgroundColor: "#fff"
    },
    cardText: {
        color: "#2e414e"
    },
    cardTextLarge: {
        fontSize: 20,
        fontWeight: 800,
    }
})

export default styles;