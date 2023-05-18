import React from 'react';

import {View, Text, ImageBackground, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const UserCards = ({userid}) => {
    if(userid == null){
        return null;
    }
    else{
        return (
        <View style={{margin: 5, padding: 8, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 330, padding: 10, backgroundColor: '#2f3855', borderRadius: 5, borderWidth: 2, borderColor: '#8dbafe'}}>
            <Text style={{textAlign: 'left', fontSize: 26, fontWeight: 'bold', color:"#fff"}}>My Cards</Text>
            <View style={{marginTop: 10, shadowColor: '#000000', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.5, shadowRadius: 3,}}>
                <ImageBackground imageStyle={{borderRadius: 5}} style={{width: 300, padding: 17, justifyContent: 'center'}} source={require('../../../../../assets/images/visabg.jpg')} resizeMode="cover">
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff', paddingBottom: 2}}>Oghene Bank</Text>
                <Text style={{fontSize: 14, fontWeight: 500, color: '#fff', paddingBottom: 8}}>Credit Card</Text>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View>
                        <Image style={{width: 50, height: 50}} resizeMode='contain' source={require('../../../../../assets/images/atmchip.png')} />
                    </View>
                    <View>
                        {/* <FontAwesome name="wifi" size={29} color="white" /> */}
                    </View>
                </View>
                <Text style={{fontSize: 23, fontWeight: 'bold', letterSpacing: 3, color:'#fff', marginBottom: 5}}>5366 5886 5453 7812</Text>
                <Text style={{fontWeight: 'bold', letterSpacing: 2, color:'#fff', marginBottom: 10}}>03/26</Text>
                <Text style={{fontSize: 18,fontWeight: 'bold', letterSpacing: 2, color:'#fff'}}>Igwe Karo</Text>
                </ImageBackground>
            </View>
        </View>
        </View>
    )
    }
}

export default UserCards