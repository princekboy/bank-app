import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../components/Credentials';
import { SafeAreaView, StatusBar, Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Stack } from 'expo-router';

const Profile = () => {

  const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

  if(storedCredentials === null){
    return null
  }else{
    const {dob, email, fullname, gender, phone, photo, token, u_id, username} = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem('mybankapp')
    .then(() => {
        setStoredCredentials("")
    })
    .catch(error => console.log(error))
}

if(token == null || token == ''){
  clearLogin()
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
                    backgroundColor: '#24293e'
                  },
                  headerTintColor: "#ffffff",
                headerShown: true,
                headerTitle: 'My Profile',
                headerTitleAlign: 'center',
              }}
            />
            <View>
              <Image source={{uri: `https://joenicehmp.com/l3git/images/users/`}} style={{width: 120, height: 120, borderRadius: 200 / 2}} resizeMode='contain' />
            </View>
            <View>
              <Text style={styles.loginHeader}>Hello {username} </Text>
            </View>
            <TouchableOpacity style={styles.buttonLight} onPress={clearLogin}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
      </SafeAreaView>
  )
}
}

export default Profile

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