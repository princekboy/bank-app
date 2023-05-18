import { Drawer } from "expo-router/drawer";

import { SafeAreaView, View, Image, Text } from "react-native";
import Drawers from '../components/common/links/Drawers'

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "index",
  };

export default function RootLayout() {
  
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