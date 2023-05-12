import React from 'react';
import { Stack, useRouter } from "expo-router";
import { BalanceCard } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const Home = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#ececec",
                    },
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerTitle: "Mobile Banking",
                    headerLeft: () => <Ionicons name='menu' size={26} color="black"></Ionicons>
                }}
            />
            <BalanceCard />
        </SafeAreaView>
    )
}

export default Home;