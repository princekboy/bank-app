import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View>
            <Text>Hello</Text>
        </View>
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