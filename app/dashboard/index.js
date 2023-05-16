import React, {useContext} from 'react'
import { AuthContext} from '../../components/Credentials';
import {Stack} from 'expo-router'
import { SafeAreaView, StatusBar, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const UserHome = () => {
  const {storedCredentials, setStoredCredentials} = useContext(AuthContext)

  const {username, email} = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem('mybankapp')
    .then(() => {
        setStoredCredentials("")
    })
    .catch(error => console.log(error))
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
                headerBackground: () => {
                  {
                    backgroundColor: '#24293e'
                  }
                },
                headerTintColor: "#ffffff",
                headerShown: true,
                headerTitle: 'My Dashboard',
                headerTitleAlign: 'center',
              }}
            />
            <View>
              <Text style={styles.loginHeader}>Hello {username} {email}</Text>
            </View>
            <TouchableOpacity style={styles.buttonLight} onPress={clearLogin}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
      </SafeAreaView>
  )
}

export default UserHome

const styles = StyleSheet.create({
  fullscreen: {
      backgroundColor: "#24293e", 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      height: '100%',
  },
  buttonLight: {
    backgroundColor: "#8dbafe",
    borderWidth: 1,
    width: 300,
    padding: 14,
    borderRadius: 5,
},
loginHeader: {
  fontSize: 30,
  marginBottom: 20,
  padding: 5,
  color: "#ffffff",
  textTransform: "uppercase",
  fontWeight: "bold",
},
btnText: {
    textAlign: 'center',
    color: "#2f3855",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: 'uppercase',
}
})