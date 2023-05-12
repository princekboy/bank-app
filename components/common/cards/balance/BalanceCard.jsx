import React from 'react'
import { TouchableOpacity } from 'react-native';

import { Box, Heading, Flex, Image, Text, Center, Spacer, Stack, Container } from "native-base";
import styles from './balancecard.style'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const BalanceCard = () => {
  return (
    <Box style={{marginTop: 6}}>
      <Box rounded="lg" overflow="hidden" _dark={{ backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{
      backgroundColor: "gray.50" }}>
        <Stack p="4" space={3}>
          <Text fontWeight="400">
            Welcome Mr. L3git Money
          </Text>
          <Stack space={3}>
            <Heading size="xl" ml="-1">
              ₦2,000,000.00
            </Heading>
          </Stack>
          <Text fontWeight="400" space={2}>
            Available Balance
          </Text>
        </Stack>
      </Box>
      <Container>
      <Center>
      <Box style={{marginTop: 10}} mW={80} safeAreaTop alignItems="center">
      <Flex direction="row" mb="2.5" mt="1.5">
        <TouchableOpacity style={{alignItems: "center"}}>
          <Box rounded="sm" p="5" overflow="hidden" _dark={{ backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{
          backgroundColor: "gray.50" }}>
            <MaterialCommunityIcons name='bank-transfer-out' size={35} color="black" />
          </Box>
          <Text fontWeight="700">
             Send Money
          </Text>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity style={{alignItems: "center"}}>
          <Box rounded="sm" p="5" overflow="hidden" _dark={{ backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{
          backgroundColor: "gray.50" }}>
            <MaterialCommunityIcons name='bank-transfer-out' size={35} color="black" />
          </Box>
          <Text fontWeight="700">
             Send Money
          </Text>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity style={{alignItems: "center"}}>
          <Box rounded="sm" p="5" overflow="hidden" _dark={{ backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{
          backgroundColor: "gray.50" }}>
            <MaterialCommunityIcons name='bank-transfer-out' size={35} color="black" />
          </Box>
          <Text fontWeight="700">
             Send Money
          </Text>
        </TouchableOpacity>
      </Flex>
      </Box>
      </Center>
      </Container>
    </Box>
  )
}

export default BalanceCard