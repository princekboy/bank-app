import { Drawer } from "expo-router/drawer";

import { SafeAreaView, View, Image, Text, Stack } from "react-native";
import Drawers from '../components/common/links/Drawers'

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "index",
  };

export default function RootLayout() {
  
  return (
      <Stack>
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
        <Stack.Screen
        name="[transactions]"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
        }}
      />
      </Stack>
  );
}
