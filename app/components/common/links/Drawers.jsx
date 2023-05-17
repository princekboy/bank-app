import React, {useContext} from 'react'

import {View, Text, TouchableOpacity, Image} from 'react-native'

import {Link} from 'expo-router'

import {Octicons, Ionicons, Fontisto, FontAwesome} from '@expo/vector-icons';

const Drawers = ({user}) => {

  //const {dob, email, fullname, gender, phone, photo, token, u_id, username} = user.storedCredentials;

  //console.log(dob)

  const clearLogin = () => {
    AsyncStorage.removeItem('mybankapp')
    .then(() => {
        setStoredCredentials("")
    })
    .catch(error => console.log(error))
}
  // console.log(userdetails)
    return (
        <View style={{marginTop: 20, padding: 5}}>
            <View
              style={{
                height: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 60,
              }}
            >
            {/* <Image source={{
              uri: photo == null ? require('../../../../assets/images/avatar.png') : `https://joenicehmp.com/l3git/images/users/${photo}`
            }} resizeMode="contain" style={{width: 90, height: 90}} /> */}
            <Link href="." style={{marginBottom: 20}}>Index</Link>
            <Link href='./profile'>Profile </Link>
            </View>
        </View>
    )
}

export default Drawers;