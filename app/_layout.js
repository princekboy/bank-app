import { Stack, Slot, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen';
import {useState, useCallback, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './components/Credentials';

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("./(auth)/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(dashboard)");
    }
  }, [user, segments]);
}


SplashScreen.preventAutoHideAsync();

const RootLayout = (props) => {

    const [appReady, setAppReady] = useState(false);
    const [storedCredentials, setStoredCredentials] = useState(null);

    useProtectedRoute(storedCredentials);

    useEffect(() => {
      async function prepare() {
        try {
          await checkLoginCredentials();
        } catch (e) {
          console.warn(e);
        } finally {
          // Tell the application to render
          setTimeout(function(){
            setAppReady(true);
          }, 2000)
          
        }
      }
  
      prepare();
    }, []);

    const checkLoginCredentials = () => {
        AsyncStorage
        .getItem('mybankapp')
        .then((result) => {
          if(result !== null) {
            setStoredCredentials(JSON.parse(result))
          }else{
            setStoredCredentials(null)
          }
        })
        .catch(error => console.log(error))
      }

    const onLayoutRootView = useCallback(async () => {
        if (appReady) {
          await SplashScreen.hideAsync();
        }
      }, [appReady]);

      if (!appReady) {
        SplashScreen.preventAutoHideAsync();
      }

      return (
        <AuthContext.Provider
          value={{storedCredentials, setStoredCredentials}}
        >
        <Stack onLayout={onLayoutRootView} screenOptions={{
          headerShown: false,
          headerStyle: () => {{
            backgroundColor: '#000000'
          }}
        }} />
        {props.children}
      </AuthContext.Provider> 
    )
}

export default RootLayout