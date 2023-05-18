import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './balancecard.style'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const BalanceCard = ({item, user}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 4}}>
      <View style={{
      width: 340, 
      padding: 24,
      margin: 1,
      backgroundColor: "#8dbafe",
      borderRadius: 5,
      justifyContent: "space-between",
      shadowColor: 'white',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{color: '#2f3855'}}>{item.accttype} Account</Text>
          <Text style={{fontSize: 33, fontWeight: 'bold', color: '#2f3855'}}>{item.symbol + '' + item.balance}</Text>
          <Text style={{fontSize: 16, color: '#2f3855'}}>({item.acctnum})</Text>
          <Text style={{fontSize: 13, color: '#2f3855'}}>{item.status == 1 ? 'Active' : 'Inactive'}</Text>
        </View>
        <View>
          <TouchableOpacity style={[styles.darkColor, {alignItems: "center", padding: 18, borderRadius: 5}]}>
              <Feather name="file-text" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={{textAlign: 'center'}}>Activity</Text>
        </View>
      </View>
      </View>
    </View>
  )
}

export default BalanceCard