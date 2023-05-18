import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './buttonhome.style'
import { MaterialCommunityIcons, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
const ButtonHomeTop = () => {
  return (
    <View style={[styles.container, {marginTop: 30, marginBottom: 20}]}>
        <View style={styles.flex}>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <FontAwesome name="exchange" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Send</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <FontAwesome name="credit-card-alt" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Card</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <FontAwesome5 name="piggy-bank" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Account</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={[styles.lightColor, {alignItems: "center", padding: 13, borderRadius: 5}]}>
              <FontAwesome5 name="book" size={28} color="white" />
            </TouchableOpacity>
            <Text style={[styles.whiteText, styles.p, {textAlign: "center"}]}>Loans</Text>
          </View>
        </View>
    </View>
  )
}

export default ButtonHomeTop