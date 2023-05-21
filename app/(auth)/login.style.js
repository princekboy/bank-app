import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5,
        marginTop: 250,
        justifyContent: "center", 
        alignItems: "center", 
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
    imgInput: {
        width: 100, 
        height: 100, 
        borderColor: '#ffffff',
        borderRadius: 400 / 2,
        borderWidth: 1,
    },
    imgInputBtn: {
        backgroundColor: '#2f3855',
        borderRadius: 200 / 2,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -10,
        top: 55
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
    fullscreen: {
        backgroundColor: "#24293e", 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        height: '100%'
    },
    flex: {
        justifyContent: "center",
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center' // if you want to fill rows left to right
    },
    bottomFlex: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center' // if you want to fill rows left to right
    },
    item: {
        width: '50%',
    },
    bottomFlexItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgBox: {
        textAlign: 'center',
        fontSize: 13,
        color: '#ffffff',
        margin: 10
    }
})

export default styles;