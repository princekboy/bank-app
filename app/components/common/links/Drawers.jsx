import {View, Text, TouchableOpacity, Image} from 'react-native'

import {Link, useRouter} from 'expo-router'

import {Octicons, Ionicons, Fontisto, FontAwesome, FontAwesome5} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../Credentials';

import { useContext } from 'react';

const Drawers = ({clearLogin}) => {

  const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

  if(storedCredentials === null){
    return null;
  }else{
    const router = useRouter();
    const {dob, email, fullname, gender, phone, photo, token, u_id, username} = storedCredentials;
    return (
        <View style={{marginTop: 80, padding: 5}}>
            <View
              style={{
                height: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 80
              }}
            >
            <Image source={
              photo == null ? require('../../../../assets/images/avatar.png') : {uri: `https://joenicehmp.com/l3git/images/users/${photo}`}
            } resizeMode="contain" style={{width: 120, height: 120, borderRadius: 200 / 2, marginBottom: 20}} />
            <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 30}}>{fullname}</Text>
            </View>
            
            <View style={{marginTop: 50, marginLeft: 20}}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={() => router.push('./')} style={{flexDirection: 'row'}}>
                  <Ionicons name="person" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Dashboard</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity onPress={() => router.push({pathname: './transfer', params: {userid: u_id}})} style={{flexDirection: 'row'}}>
                  <FontAwesome name="exchange" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Transfer</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity onPress={() => router.push('./transactions')} style={{flexDirection: 'row'}}>
                  <FontAwesome name="line-chart" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Transactions</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity onPress={() => router.push('./cards')} style={{flexDirection: 'row'}}>
                  <FontAwesome name="credit-card" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Cards</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity onPress={() => router.push('./loans')} style={{flexDirection: 'row'}}>
                  <FontAwesome5 name="hand-holding-usd" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Loans</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity onPress={() => router.push('./profile')} style={{flexDirection: 'row'}}>
                  <Ionicons name="person-circle-sharp" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity onPress={clearLogin} style={{flexDirection: 'row'}}>
                  <FontAwesome name="sign-out" size={20} color='blue' style={{paddingRight: 30}} />
                  <Text style={{paddingRight: 50, fontSize: 16}}>Logout</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 60}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{paddingRight: 50, fontSize: 16}}>&copy; 2023 Oghene Bank</Text>
                </View>
              </View>
            </View>
            </View>
    )
  }
}

export default Drawers;