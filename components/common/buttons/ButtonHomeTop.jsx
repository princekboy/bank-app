import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './buttonhome.style'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
const ButtonHomeTop = () => {
  return (
    <View style={[styles.container, {marginTop: 30, marginBottom: 20}]}>
        <View style={styles.flex}>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <MaterialCommunityIcons name="bank-transfer" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Send Money</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <Ionicons name="wifi" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Airtime</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <MaterialCommunityIcons name="cable-data" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Data</Text>
          </View>
        </View>
    </View>
  )
}

export default ButtonHomeTop