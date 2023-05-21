import React, {useState} from 'react'
import {View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'

import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';

import styles from './form.style'
import axios from 'axios'

import {countries, states} from '../../countries';

import {Octicons, Ionicons, FontAwesome5} from '@expo/vector-icons';

const WireForm = ({account}) => {
    const [message, setMessage] = useState('');

    const handleMessage = (message) => {
        setMessage(message)
    }
    
    const [accountFrom, setAccountFrom] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [newState, setNewState] = useState();
    const initialValues = {
        accountTo: '',
        country: '',
        state: '',
        fullname: '',
        swift: '',
        bank: '',
        accountFrom: '',
        amount: '',
        desc: ''
    }

    const handleSend = (values, setSubmitting) => {
        const {accountTo, accountFrom, amount, desc} = values;
        handleMessage(null);

        const url = 'https://joenicehmp.com/l3git/dbo/userop.php';

        let formData = new FormData();
        formData.append('accountTo', accountTo);
        formData.append('accountFrom', accountFrom);
        formData.append('amount', amount);
        formData.append('desc', desc);
        formData.append('country', selectedCountry);
        formData.append('state', selectedState);
        formData.append('swift', swift);
        formData.append('fullname', fullname);
        formData.append('bank', bank);
        formData.append('param', 'wire');
        formData.append('u_id', account[0].u_id);

        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        axios
        .post(url, formData, config)
        .then(async (response) => {
            const result = response.data;
            if(result.response == 'success'){
                handleMessage("Transfer successful")
            }else{
                handleMessage(`Error Occured - ${result.response}`)
            }
            setSubmitting(false)
        })
        .catch((error) => {
            console.log(error)
            setSubmitting(false);
            handleMessage("An error occured. Check your network and try again")
        })
    }
        // console.log(states)
        const changeState = (index) => {
            const theNew = states[index].split('|')
            setNewState(theNew)
        }
       
  return (
    <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                <Text style={styles.loginHeader}>Wire Transfer</Text>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, {setSubmitting}) => {
                    values = {...values, accountFrom: accountFrom, country: selectedCountry, state: selectedState}
                    if(values.accountTo == '' || values.accountFrom == '' || values.country == '' || values.fullname == '' || values.bank == '' || values.swift == '' || values.state == '' || values.amount == '' || values.desc == ''){
                        handleMessage("Please fill all fields");
                        setSubmitting(false)
                    }else{
                        handleSend(values, setSubmitting);
                    }
                }}
              >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <>
                        <View style={{backgroundColor: '#2f3855', height: 55, marginBottom: 10, borderWidth: 1, borderColor: '#ffffff', padding: 0, borderRadius: 5}}>
                            <Picker
                                selectedValue={accountFrom}
                                onValueChange={(itemValue, itemIndex) =>
                                    setAccountFrom(itemValue)
                                }
                                style={{
                                    padding: 10,
                                    paddingLeft: 42,
                                    textAlign: 'left',
                                    width: 300,
                                    paddingBottom: 20,
                                    color: '#fff',
                                    marginVertical: 3
                                }}
                                >
                                <Picker.Item selectedValue enabled={false} label="--Select Account--" value={null} />
                                {  account !== null ?
                                    account.map((item) => (
                                        <Picker.Item key={item.acctnum} label={`${item.acctnum} (${item.accttype})`} value={item.acctnum} />
                                    ))
                                    
                                    :
                                    null
                                }
                            </Picker>
                        </View>
                        <View style={{backgroundColor: '#2f3855', height: 55, marginBottom: 10, borderWidth: 1, borderColor: '#ffffff', padding: 0, borderRadius: 5}}>
                            <Picker
                                selectedValue={selectedCountry}
                                onValueChange={(itemValue, itemIndex) => (
                                    setSelectedCountry(itemValue),
                                    changeState(itemIndex)
                                )}
                                style={{
                                    padding: 10,
                                    paddingLeft: 42,
                                    textAlign: 'left',
                                    width: 300,
                                    paddingBottom: 20,
                                    color: '#fff',
                                    marginVertical: 3
                                }}
                                >
                                <Picker.Item selectedValue enabled={false} label="--Select Country--" value={null} />
                                {  countries != null ?
                                    countries.map((item, index) => (
                                        <Picker.Item key={index} label={`${item}`} value={item} />
                                    ))

                                    : null
                                }
                            </Picker>
                        </View>
                        <View style={{backgroundColor: '#2f3855', height: 55, marginBottom: 10, borderWidth: 1, borderColor: '#ffffff', padding: 0, borderRadius: 5}}>
                            <Picker
                                selectedValue={selectedState}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedState(itemValue)
                                }
                                style={{
                                    padding: 10,
                                    paddingLeft: 42,
                                    textAlign: 'left',
                                    width: 300,
                                    paddingBottom: 20,
                                    color: '#fff',
                                    marginVertical: 3
                                }}
                                >
                                <Picker.Item selectedValue enabled={false} label="--Select State--" value={null} />
                                {   newState != null ?
                                    newState.map((item, index) => (
                                        <Picker.Item key={index} label={`${item}`} value={item} />
                                    ))
                                    : null
                                }
                            </Picker>
                        </View>
                        <MyTextInput
                            icon="money-bill-alt"
                            placeholder='Amount'
                            value={values.amount}
                            onChangeText={handleChange('amount')}
                            style={styles.textInput}
                            handleBlur={handleBlur('amount')}
                            placeholderTextColor="#ffffff"
                        />
                        <MyTextInput
                            icon="user"
                            placeholder='Full name'
                            value={values.fullname}
                            onChangeText={handleChange('fullname')}
                            style={styles.textInput}
                            handleBlur={handleBlur('fullname')}
                            placeholderTextColor="#ffffff"
                        />
                        <MyTextInput
                            icon="dollar-sign"
                            placeholder='Account Number'
                            value={values.accountTo}
                            onChangeText={handleChange('accountTo')}
                            style={styles.textInput}
                            handleBlur={handleBlur('accountTo')}
                            placeholderTextColor="#ffffff"
                        />
                        <MyTextInput
                            icon="landmark"
                            placeholder='Bank Name'
                            value={values.bank}
                            onChangeText={handleChange('bank')}
                            style={styles.textInput}
                            handleBlur={handleBlur('bank')}
                            placeholderTextColor="#ffffff"
                        />
                        <MyTextInput
                            icon="cubes"
                            placeholder='Routing/Swift Code/IBAN'
                            value={values.swift}
                            onChangeText={handleChange('swift')}
                            style={styles.textInput}
                            handleBlur={handleBlur('swift')}
                            placeholderTextColor="#ffffff"
                        />
                        <MyTextInput
                            icon="edit"
                            placeholder='Transaction Naration (Optional)'
                            value={values.desc}
                            onChangeText={handleChange('desc')}
                            style={styles.textInput}
                            handleBlur={handleBlur('desc')}
                            placeholderTextColor="#ffffff"
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text type={message} style={styles.msgBox}>{message}</Text>
                        {!isSubmitting && <TouchableOpacity style={styles.buttonLight} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Send</Text>
                        </TouchableOpacity>}
                        {isSubmitting && <TouchableOpacity style={styles.buttonLight} disabled={true}>
                            <ActivityIndicator size="large" color='#ffffff' />
                        </TouchableOpacity>}
                    </>
              )}
                </Formik>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
  )
}

const MyTextInput = ({icon, ...props}) => {
    return (
        <View>
            <View style={styles.leftIcon}>
                <FontAwesome5 name={icon} size={15} color='#ffffff' />
            </View>
            <TextInput {...props} />
        </View>
    )
}

export default WireForm