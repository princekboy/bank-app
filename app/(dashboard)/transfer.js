import React, {useState, useEffect} from 'react'
import {View, Text, SafeAreaView, RefreshControl, StatusBar, ScrollView, ActivityIndicator} from 'react-native'
import {Stack, useLocalSearchParams} from 'expo-router'
import { Local, Same, Tabs, Wire }  from '../components'
import axios from 'axios'

const tabs = ["Same", "Wire", "Local"];

const Transfer = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [accounts, setAccounts] = useState();
  const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    url = 'https://joenicehmp.com/l3git/dbo/userop.php';
    
    data = {
      u_id: params.userid,
      param: 'getaccounts'
    }

    const fetchUserData = () => {
      axios
      .post(url, data, config)
      .then(async (response) => {
        if(response !== null || response !== undefined){
          setAccounts(response.data)
        }
      })
      .catch((error) => {
        console.log("An error occured ", error)
      })
    }
    
    useEffect(() => {
      fetchUserData()
    }, [])
  
  const displayTabContent = () => {
    if(accounts == null){
      return null
    }else{
      switch(activeTab) {
        case "Same":
          return (
            <Same account={accounts.response} />
          )
          break;
        case "Wire":
          return (
            <Wire account={accounts.response} />
          )
          break;
        case "Local":
          return (
            <Local account={accounts.response} />
          )
          break;
        default: 
          return (
            <Same account={accounts.response} />
          )
        break;
      }
    }
  }
  return (
    <SafeAreaView style={{
      backgroundColor: "#24293e", 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        height: '100%'
    }}>
        <StatusBar
                animated={true}
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
                headerTitle: 'Transfers',
                headerTitleAlign: 'center',
              }}
            />
            <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchUserData} /> }>
              <View>
                <View style={{borderBottomColor: '#fff', borderBottomWidth: 2, paddingBottom: 10, margin: 10}}>
                  <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
                      Transfers
                  </Text>
                </View>
                <Tabs 
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {accounts === null ? <ActivityIndicator size="large" color="#fff" /> : displayTabContent()}
              </View>
            </ScrollView>  
    </SafeAreaView>
  )
}

export default Transfer