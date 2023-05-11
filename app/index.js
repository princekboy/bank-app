import React from 'react';
import {View, Text, SafeAreaView} from 'react-native'
import { Stack, useRouter } from "expo-router";
import { BalanceCard } from '../components';

const Home = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#cdcdcd",
                    },
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerTitle: "Bank App",
                }}
            />
            <BalanceCard />
        </SafeAreaView>
    )
}

export default Home;