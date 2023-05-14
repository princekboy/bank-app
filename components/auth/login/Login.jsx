import React, {useState} from 'react'

import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

import styles from './login.style';

import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = () => {
        console.log(`${username} + ${password}`)
        setUsername("")
        setPassword("")
    }

  return (
    <KeyboardAvoidingView>
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
            <TouchableOpacity style={{marginTop: 15}}>
                <Text style={{textAlign: 'right', color: '#fff', fontWeight: 'bold'}}>Forgot Password??</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default Login