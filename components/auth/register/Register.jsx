import React, {useState} from 'react'

import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

import styles from './register.style';

import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleRegister = () => {
        console.log(`${username} + ${password}`)
        setUsername("")
        setPassword("")
    }

  return (
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
  )
}

export default Register