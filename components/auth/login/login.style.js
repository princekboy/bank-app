import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5,
        justifyContent: "center", 
        alignItems: 'center', 
        flex: 1
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
    textInput: {
        backgroundColor: '#2f3855',
        borderRadius: 5,
        padding: 8,
        borderColor: '#fff',
        borderWidth: 1,
        textAlign: 'left',
        width: 300,
        marginBottom: 10,
        color: '#fff',
    },
    loginHeader: {
        fontSize: 30,
        marginBottom: 20,
        padding: 5,
        color: "#ffffff",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    buttonLight: {
        backgroundColor: "#8dbafe",
        borderWidth: 1,
        width: 300,
        padding: 14,
        borderRadius: 5,
    },
    btnText: {
        textAlign: 'center',
        color: "#2f3855",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: 'uppercase',
    }
})

export default styles;