import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5
    },
    card: {
        border: 5,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 4 
    },
    textLight: {
        color: "#8dbafe"
    },
    textDark: {
        color: "#2f3855"
    },
    cardTextLarge: {
        fontSize: 26,
        fontWeight: 800,
    },
    darkColor: {
        backgroundColor: "#2f3855"
    },
    lightColor: {
        backgroundColor: "#8dbafe",
    },
    whiteText: {
        color: "#ffffff",
    },
    p: {
        padding: 10
    },
    flex: {
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'space-between' // if you want to fill rows left to right
    },
    item: {
        width: '20%',
        margin: 5,
    }
})

export default styles;