import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Login } from '../components/auth';



const Home = () => {
    return (
        <SafeAreaView style={styles.fullscreen}>
            <StatusBar
                animated={false}
                backgroundColor="#24293e"
                barStyle="light-content"
                hidden={false}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#24293e",
                    },
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerTitle: "Mobile Banking",
                    headerShown: false,
                    headerTintColor: "#ffffff"
                }}
            />
            <Login />
            {/* <BalanceCard />
            <ButtonTop /> */}
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    fullscreen: {
        backgroundColor: "#24293e", 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    }
})