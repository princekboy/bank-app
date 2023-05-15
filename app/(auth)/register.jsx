import React, {useState} from 'react'
import { StyleSheet, SafeAreaView, StatusBar, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router'

import styles from './register.style';

import axios from 'axios';

const RegScreen = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleRegister = () => {
        console.log(`${username} + ${password}`)
        setUsername("")
        setPassword("")
    }

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
                    headerShown: true,
                    headerTintColor: "#ffffff",
                    headerBackVisible: true
                }}
            />
            <KeyboardAvoidingView>
                <View style={styles.container}>
                <Text style={styles.loginHeader}>Register</Text>
                    <TextInput
                        placeholder='Username/Email'
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={styles.textInput}
                        placeholderTextColor="#ffffff"
                    />
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.textInput}
                        placeholderTextColor="#ffffff"
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.buttonLight} onPress={handleRegister}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 15}}>
                        <Text style={{textAlign: 'right', color: '#fff', fontWeight: 'bold'}}>Forgot Password??</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

export default RegScreen

