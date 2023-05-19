import { useContext } from "react";
import { Drawer } from "expo-router/drawer";

import { SafeAreaView, View, Image, Text } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Drawers from '../components/common/links/Drawers';

import { AuthContext } from '../components/Credentials';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "index",
};

export default function RootLayout() {
  const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

  const clearLogin = () => {
      AsyncStorage.removeItem('mybankapp')
      .then(() => {
          setStoredCredentials("")
      })
      .catch(error => console.log(error))
  }
  return (
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#8dbafc',
              width: 260,
            },
            drawerActiveBackgroundColor: '#ffffff'
          }}
          drawerContent={(props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <Drawers clearLogin={clearLogin} />
            </SafeAreaView>
          );
        }}
      />
  );
}
