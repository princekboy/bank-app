import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../components/Credentials';
import { SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StatusBar, Image, TouchableOpacity, FlatList, Text, View, StyleSheet } from 'react-native';

import { Link, Stack } from 'expo-router';

import axios from 'axios';
import { BalanceCard, ButtonTop, Cards, Tabs } from '../components';

const UserHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult] = useState();
  const {storedCredentials, setStoredCredentials} = useContext(AuthContext);
  const config = {
        headers: {'Content-Type': 'multipart/form-data'},
      };
  const fetchUserData = () => {
      url = 'https://joenicehmp.com/l3git/dbo/userop.php';
      data = {};
     if(storedCredentials !== null){
      const {dob, email, fullname, gender, phone, photo, token, u_id, username} = storedCredentials;
      data = {
        u_id: u_id,
        param: 'getaccounts'
      }
    }
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

  if(storedCredentials !== null){
    const {dob, email, fullname, gender, phone, photo, token, u_id, username} = storedCredentials;
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
            <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchUserData} /> }>
            <View style={{margin: 10, marginTop: 17}}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 800}}>Good morning, {fullname}</Text>
            </View>
              {result == null ? <ActivityIndicator size="large" color="#ffffff" /> : 
                result.status == 'error' ? <View>
                  <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>{result.response}</Text>
                </View> : 
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
              <ButtonTop userid={u_id} />
              <View style={{padding: 8, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 335, padding: 10, backgroundColor: '#2f3855', borderRadius: 5, borderWidth: 1, borderColor: '#8dbafe'}}>
                    <Text style={{textAlign: 'left', fontSize: 26, fontWeight: 'bold', color:"#fff"}}>My Cards</Text>
                    <View style={{borderBottomColor: '#ffffff', borderBottomWidth: 1, padding: 5, marginBottom: 5}}></View>
                    {result == null ? <ActivityIndicator size="large" color="#ffffff" /> : <Cards userid={u_id} fullname={fullname} />}
                  </View>
                </View>
                <Text>My Transactions</Text>
              {/* <TabButton /> */}
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