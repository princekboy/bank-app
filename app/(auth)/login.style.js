import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fullscreen: {
        backgroundColor: "#24293e", 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
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
        paddingLeft: 42,
        borderColor: '#fff',
        borderWidth: 1,
        textAlign: 'left',
        width: 300,
        marginBottom: 10,
        color: '#fff',
        marginVertical: 3
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
    },
    msgBox: {
        textAlign: 'center',
        fontSize: 13,
        color: '#ffffff',
        margin: 10
    },
    leftIcon: {
        left: 17,
        top: 20,
        position: 'absolute',
        zIndex: 1,
    },
    rightIcon: {
        right: 17,
        top: 17,
        position: 'absolute',
        zIndex: 1,
    },
})

export default styles;