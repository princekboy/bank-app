import React, {useState, useContext} from 'react'
import { SafeAreaView, View, ScrollView, Text, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

import styles from './login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Formik } from 'formik';

import { AuthContext } from '../components/Credentials';

import axios from 'axios';

import { Stack, useRouter } from 'expo-router';

import {Octicons, Ionicons} from '@expo/vector-icons';

const initialValues = {
    username: '',
    password: ''
}


const LoginScreen = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState('');

    const router = useRouter();

    const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://joenicehmp.com/l3git/dbo/login.php';

        const { username, password } = credentials;

        let formData = new FormData();


        formData.append('username', username);
        formData.append('password', password);
        
        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        axios
        .post(url, formData, config)
        .then(async (response) => {
            const result = response.data;
            let m = {};
            if(result.message == 'success'){
                m = {
                    u_id: result.u_id,
                    fullname: result.fullname,
                    token: result.token,
                    username: result.username,
                    email: result.email,
                    gender: result.gender,
                    phone: result.phone,
                    photo: result.photo,
                    dob: result.dob
                }
                handleMessage("Login successful")
                setTimeout(function(){
                    persistLogin({...m})
                }, 2000);
                console.log(m)
            }else{
                handleMessage(`Login failed - ${result.message}`)
            }
            setSubmitting(false)
        })
        .catch((error) => {
            console.log(error)
            setSubmitting(false);
            handleMessage("An error occured. Check your network and try again")
        })
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

    const handleMessage = (message) => {
        setMessage(message)
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
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={styles.container}>
                <Text style={styles.loginHeader}>Login</Text>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, {setSubmitting}) => {
                    if(values.username == '' || values.password == ''){
                        handleMessage("Please fill all fields");
                        setSubmitting(false)
                    }else{
                        handleLogin(values, setSubmitting);
                    }
                }}
              >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <>
                        <MyTextInput
                            icon="person"
                            placeholder='Username'
                            value={values.username}
                            onChangeText={handleChange('username')}
                            style={styles.textInput}
                            handleBlur={handleBlur('username')}
                            placeholderTextColor="#ffffff"
                        />
                        <MyTextInput
                            placeholder='Password'
                            icon="lock"
                            placeholderTextColor="#ffffff"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            style={styles.textInput}
                        />
                        <Text type={message} style={styles.msgBox}>{message}</Text>
                        {!isSubmitting && <TouchableOpacity style={styles.buttonLight} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>}
                        {isSubmitting && <TouchableOpacity style={styles.buttonLight} disabled={true}>
                            <ActivityIndicator size="large" color='#ffffff' />
                        </TouchableOpacity>}
                        <TouchableOpacity style={{marginTop: 25}} onPress={() => router.push('/register')}>
                            <Text style={{textAlign: 'left', color: '#fff', fontWeight: 'bold', fontSize: 20}}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 25}}>
                            <Text style={{textAlign: 'right', color: '#fff', fontWeight: 'bold'}}>Forgot Password??</Text>
                        </TouchableOpacity>
                    </>
              )}
                </Formik>
                </View>
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

const MyTextInput = ({icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={15} color='#ffffff' />
            </View>
            <TextInput {...props} />
            {isPassword && (
                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={18} color='#ffffff' />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default LoginScreen