import { Drawer } from "expo-router/drawer";
import { useContext } from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import Drawers from '../components/common/links/Drawers'

import { AuthContext } from '../components/Credentials';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "index",
  };

export default function RootLayout() {

  const {storedCredentials, setStoredCredentials} = useContext(AuthContext)

  //console.log(storedCredentials)

  // const {dob, email, fullname, gender, phone, photo, token, u_id, username} = storedCredentials;
  
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
              <Drawers user={{storedCredentials}} />
            </SafeAreaView>
          );
        }}
      />
  );
}