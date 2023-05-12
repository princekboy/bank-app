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
        color: "#fdb814"
    },
    textDark: {
        color: "#2e414e"
    },
    cardTextLarge: {
        fontSize: 26,
        fontWeight: 800,
    },
    darkColor: {
        backgroundColor: "#2e414e"
    },
    lightColor: {
        backgroundColor: "#fdb814",
    },
    p: {
        padding: 10
    },
    flex: {
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%'
    }
})

export default styles;