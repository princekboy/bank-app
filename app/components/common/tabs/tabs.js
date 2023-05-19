import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

const TabButton = ({name, activeTab, handlePress}) => {
  return(
    <TouchableOpacity 
      style={{margin: 2, width: 100, backgroundColor: '#8dbafe', padding: 10, borderRadius: 5}} 
      onPress={handlePress}
      >
      <Text style={{textAlign:'center'}}>{name}</Text>
    </TouchableOpacity>
  )
}

const Tabs = ({tabs, activeTab, setActiveTab}) => {
  
    return (
        <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
        <FlatList 
            data={tabs}
            renderItem={({item}) => (
            <TabButton 
                name={item}
                activeTab={activeTab}
                handlePress={() => setActiveTab(item)}
            />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            contentContainerStyle={{columnGap: 2}}
        />
        </View>
  )
}

export default Tabs