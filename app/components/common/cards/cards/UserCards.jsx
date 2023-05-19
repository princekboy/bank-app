import React, {useState, useEffect} from 'react';

import {View, Text, ImageBackground, Image, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import axios from 'axios'

const UserCards = ({userid, fullname}) => {
    const [result, setResult] = useState()
    const datatoSend = {
            u_id: userid,
            param: 'fetchcards'
        }
        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        url = 'https://joenicehmp.com/l3git/dbo/userop.php';

        const fetchUserData = () => {
        axios
        .post(url, datatoSend, config)
        .then(async (response) => {
            if(response !== null || response !== undefined){
            setResult(response.data)
            }
        })
        .catch((error) => {
            console.log("An error occured ", error)
        })
        }
        
        useEffect(() => {
        fetchUserData()
        }, [])
    if(userid == null){
        return null;
    }else{
        if(result == null) {
            return (<View>
                <Text>No data Found</Text>
            </View>
            )
        }else{
            return(
                <View>
                    {result.status == 'error' ? 
                    <View>
                        <Text style={{color: '#fff', textAlign: 'center'}}>{result.response}</Text>
                    </View> 
                    : <FlatList
                        data={result.response}
                        renderItem={({ item }) => (
                            <MyCards item={item} fullname={fullname} />
                        )}
                        keyExtractor={(item) => item.card_id}
                        contentContainerStyle={{ columnGap: 2 }}
                        horizontal
                        />
                    }
                </View>
            )
        }
        
    }
}

export const MyCards = ({item, fullname}) => {
    return (
        <View style={{marginTop: 10, shadowColor: '#000000', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.5, shadowRadius: 3,}}>
            <ImageBackground imageStyle={{borderRadius: 17}} style={{width: 300, padding: 17, justifyContent: 'center'}} source={require('../../../../../assets/images/visabg.jpg')} resizeMode="cover">
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff', paddingBottom: 2}}>Oghene Bank</Text>
                        <Text style={{fontSize: 14, fontWeight: 500, color: '#fff', paddingBottom: 8}}>{item.cardtype}</Text>
                    </View>
                    <View>
                        <Image 
                            style={{width: 65, height: 65}} resizeMode='contain' 
                            source={item.cardbrand == 'Master' ? require('../../../../../assets/images/mcard.webp') : item.cardbrand == 'Visa' ? require('../../../../../assets/images/vcard.png') : '' } 
                            />
                        </View>
                    </View>
                    
                    <View style={{marginBottom: 5}}>
                        <Image style={{width: 50, height: 50}} resizeMode='contain' source={require('../../../../../assets/images/atmchip.png')} />
                    </View>
                <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 4, color:'#fff', marginBottom: 5}}>{item.cardnum}</Text>
                <Text style={{color:'#fff'}}>Exp</Text><Text style={{fontWeight: 'bold', letterSpacing: 2, color:'#fff', marginBottom: 10}}>{item.expdate}</Text>
                <Text style={{fontSize: 18,fontWeight: 'bold', letterSpacing: 2, color:'#fff'}}>{fullname}</Text>
            </ImageBackground>
        </View>
    )
}

export default UserCards