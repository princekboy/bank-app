import React, {useState, useContext} from 'react'
import { SafeAreaView, View, Text, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity } from 'react-native'

import styles from './login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../components/Credentials';

import axios from 'axios';
import { Stack, useRouter } from 'expo-router';



const LoginScreen = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const router = useRouter();

    const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

    const handleLogin = () => {
        if(username == null || password == null){
            alert("Please fill all fields")
        }else{
            console.log(`${username} + ${password}`)
            persistLogin({username, password})
            setUsername("")
            setPassword("")
        }
    }

    const persistLogin = (credentials) => {
        AsyncStorage
        .setItem('mybankapp', JSON.stringify(credentials))
        .then((result) => {
            setStoredCredentials(credentials)
        })
        .catch((error) => {
            console.log(error)
        })
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
                    headerShown: false,
                    headerTintColor: "#ffffff"
                }}
            />
            <KeyboardAvoidingView>
                <StatusBar
                    animated={false}
                    backgroundColor="#24293e"
                    barStyle="light-content"
                    hidden={false}
                />
                <Stack.Screen 
                    options={{
                        headerShown: false,
                    }}
                />
                <View style={styles.container}>
                <Text style={styles.loginHeader}>Login</Text>
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
                    <TouchableOpacity style={styles.buttonLight} onPress={handleLogin}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 15}} onPress={() => router.push('/register')}>
                        <Text style={{textAlign: 'left', color: '#fff', fontWeight: 'bold'}}>Signup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 15}}>
                        <Text style={{textAlign: 'right', color: '#fff', fontWeight: 'bold'}}>Forgot Password??</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

export default LoginScreen

