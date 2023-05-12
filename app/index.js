import React from 'react';
import { Stack, useRouter } from "expo-router";
import { BalanceCard } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Box, Button } from 'native-base';

const Home = () => {
    return (
        <NativeBaseProvider>
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
        </NativeBaseProvider>
    )
}

export default Home;