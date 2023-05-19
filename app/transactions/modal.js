import { View, SafeAreaView } from "react-native";
import { Link, useNavigation, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {FontAwesome} from '@expo/vector-icons'

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  return (
    <SafeAreaView>
    <Stack.Screen
     options={{
      headerTitle: 'Test',
          headerLeft: () => <Link href={() => router.push('./')}><FontAwesome name="arrow-left" size={22} color="#8dbafc" /></Link>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#24293e',
          },
          headerTintColor: '#8dbafc'
     }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View>
    </SafeAreaView>
  );
}
