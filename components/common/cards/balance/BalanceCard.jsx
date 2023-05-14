import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './balancecard.style'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const BalanceCard = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.card, styles.darkColor, {padding: 30}]}>
        <View style={styles.flex}>
          <View style={styles.item}>
            <Text style={{color: "#ffffff", paddingBottom: 10}}>Good Morning Oghenekharo,</Text>
            <Text style={[styles.cardTextLarge, styles.textLight, {paddingBottom: 10}]}>₦2,000,000</Text>
            <Text style={{color: "#ffffff"}}>Available Balance</Text>
          </View>
          <View style={[styles.item, {paddingLeft: 80, paddingTop: 20}]}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <Feather name="file-text" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default BalanceCard