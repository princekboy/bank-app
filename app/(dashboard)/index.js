import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../components/Credentials';
import { SafeAreaView, ScrollView, ActivityIndicator, StatusBar, Image, TouchableOpacity, FlatList, Text, View, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Stack } from 'expo-router';

import axios from 'axios';
import { BalanceCard, ButtonTop, Cards } from '../components';

const UserHome = () => {

  const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

  if(storedCredentials === null){
    return null
  }else{
    const {dob, email, fullname, gender, phone, photo, token, u_id, username} = storedCredentials;
    const [result, setResult] = useState();

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    url = 'https://joenicehmp.com/l3git/dbo/userop.php';
    data = {
      u_id: u_id,
      param: 'getaccounts'
    }

    const fetchUserData = () => {
      axios
      .post(url, data, config)
      .then(async (response) => {
        if(response !== null || response !== undefined){
          setResult(response.data)
          // console.log(result.response)
        }
      })
      .catch((error) => {
        console.log("An error occured ", error)
      })
    }
    
    useEffect(() => {
      fetchUserData()
    }, [])

    const refetch = () => {
      fetchUserData()
    }
  const clearLogin = () => {
      AsyncStorage.removeItem('mybankapp')
      .then(() => {
          setStoredCredentials("")
      })
      .catch(error => console.log(error))
  }

// if(token == null || token == ''){
//   clearLogin()
// }
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
                headerTitle: 'My Dashboard',
                headerTitleAlign: 'center',
              }}
            />
            <ScrollView>
            <View style={{margin: 10, marginTop: 17}}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 800}}>Good morning, {fullname}</Text>
            </View>
              {result == null ? <ActivityIndicator size="large" color="#ffffff" /> : 
                <FlatList
                  data={result.response}
                  renderItem={({ item }) => (
                    <BalanceCard
                      item={item}
                      user={storedCredentials}
                    />
                  )}
                  keyExtractor={(item) => item.main_id}
                  contentContainerStyle={{ columnGap: 1 }}
                  horizontal
                />
              }
              <ButtonTop />
              {result == null ? <ActivityIndicator size="large" color="#ffffff" /> : <Cards userid={storedCredentials.u_id} />}
            </ScrollView>
      </SafeAreaView>
  )
}
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