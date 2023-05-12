import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    
    setTimeout(SplashScreen.hideAsync, 1000)
    
    return (
        <Stack />
    )
}

export default Layout