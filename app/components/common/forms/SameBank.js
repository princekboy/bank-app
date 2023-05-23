import React, {useState} from 'react'
import {View, Text, Modal, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'

import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';

import { useRouter } from 'expo-router';

import styles from './form.style'
import axios from 'axios'

import {FontAwesome5, Ionicons} from '@expo/vector-icons';

const SameBank = ({account}) => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [messageM, setMessageM] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [res, setRes] = useState();

    const handleMessage = (message) => {
        setMessage(message)
    }
    
    const [accountFrom, setAccountFrom] = useState('');
    const initialValues = {
        accountTo: '',
        accountFrom: '',
        amount: '',
        desc: ''
    }

    const pinValues = {
        accountPin: '',
    }

    const handleSend = (values, setSubmitting) => {
        const {accountTo, accountFrom, amount, desc} = values;
        handleMessage(null)
        const url = 'https://joenicehmp.com/l3git/dbo/userop.php';

        let formData = new FormData();
        formData.append('accountTo', accountTo);
        formData.append('accountFrom', accountFrom);
        formData.append('amount', amount);
        formData.append('desc', desc);
        formData.append('param', 'same');
        formData.append('u_id', account[0].u_id);

        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        axios
        .post(url, formData, config)
        .then(async (response) => {
            const result = response.data;
            if(result.status == 'success'){
                handleMessage("Processing transactions ...")
                setRes(result.response)
                setTimeout(() => {
                    handleMessageM(null)
                    handleMessage(null)
                    console.log(res)
                    setModalVisible(true)
                }, 1000);
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
     
    const handleCancel = () => {
        const user = res.userid;
        const transcid = res.transcid
        
        const url = 'https://joenicehmp.com/l3git/dbo/userop.php';

        let formData = new FormData();
        formData.append('transcid', transcid);
        formData.append('userid', user);
        formData.append('param', 'cancelTrans');

        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        axios
        .post(url, formData, config)
        .then(async (response) => {
            const result = response.data;
            if(result.status == 'success'){
                handleMessage(result.response)
                setModalVisible(false)
                setTimeout(() => {
                    handleMessage(null)
                   router.push('./'); 
                }, 200)
            }else{
                handleMessage(`Error Occured - ${result.response}`)
                setTimeout(() => {
                   handleMessage(null)
                }, 2000)
            }
        })
        .catch((error) => {
            console.log(error)
            handleMessage("An error occured. Check your network and try again")
        })
    }

    const handleMessageM = (messageM) => {
        setMessageM(messageM)
    }

    const handleConfirm = (values, setSubmitting) => {
        handleMessage(null)
        handleMessageM(null)
        const user = res.userid;
        const transcid = res.transcid
        const account = res.account;
        const accountPin = values.accountPin

        const url = 'https://joenicehmp.com/l3git/dbo/userop.php';

        const formData = new FormData();

        formData.append('transcid', transcid);
        formData.append('userid', user);
        formData.append('param', 'checkpin');
        formData.append('accountPin', accountPin);
        formData.append('account', account);

        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        axios
        .post(url, formData, config)
        .then(async (response) => {
            const result = response.data;
            if(result.status == 'success'){
                handleMessageM('Transaction Successful')
                setTimeout(() => {
                    setModalVisible(false)
                    router.push('./')
                }, 2000);
            }else if(result.status == 'canceled'){
               handleMessageM(`Error Occured - ${result.response}`)
               setTimeout(() => {
                handleCancel()
                handleMessage(null)
               }, 2000);
            }else{
                handleMessageM(`Error Occured - ${result.response}`)
            }
            setSubmitting(false)
        })
        .catch((error) => {
            console.log(error)
            handleMessageM("An error occured. Check your network and try again")
        })
    }
  return (
    <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                <Text style={styles.loginHeader}>Same Bank Transfer</Text>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, {setSubmitting, resetForm}) => {
                    values = {...values, accountFrom: accountFrom}
                    if(values.accountTo == '' || values.accountFrom == '' || values.amount == ''){
                        handleMessage("Please fill all fields");
                        setSubmitting(false)
                    }else if(values.accountFrom == null){
                        handleMessage("Select an account to send from");
                        setSubmitting(false)
                    }
                    else{
                        handleSend(values, setSubmitting);
                        resetForm({values: ''})
                    }
                }}
              >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <>
                        <MyTextInput
                            icon="user"
                            placeholder='Account Number'
                            value={values.accountTo}
                            onChangeText={handleChange('accountTo')}
                            style={styles.textInput}
                            handleBlur={handleBlur('accountTo')}
                            placeholderTextColor="#ffffff"
                        />
                        <View style={{backgroundColor: '#2f3855', height: 55, marginBottom: 10, borderWidth: 1, borderColor: '#ffffff', padding: 0, borderRadius: 5}}>
                            <Picker
                                selectedValue={accountFrom}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setAccountFrom(itemValue)
                                }
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
                                <Picker.Item selectedValue label="--Select Account--" value={null} />
                                { account !== null || account !== "" ?
                                    account.map((item) => (
                                        <Picker.Item key={item.acctnum} label={`(${item.symbol}${item.balance}) ${item.acctnum} [${item.accttype}]`} value={item.acctnum} />
                                    ))
                                    :
                                    null
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
                <View>
                    <Modal
                        animationType="slide"
                        animationInTiming={2000}
                        animationOutTiming={2000}
                        backdropTransitionInTiming={2000}
                        backdropTransitionOutTiming={2000}
                        animationIn={'zoomInDown'}
                        animationOut={'zoomOutUp'}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                        }}>
                        <View style={{justifyContent: 'center', flex: 1, height: '80%'}}>
                        <View style={{borderRadius: 8, margin: 15, backgroundColor: '#424f76', alignItems: 'center', paddingBottom: 18}}>
                        <View style={{padding: 25, width: '100%', borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 10}}>
                            <Text style={{textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 18, fontWeight: 'bold'}}>Transaction Details</Text>
                            <TouchableOpacity
                            style={{position: 'absolute', right: 15, top: 20}}
                            onPress={
                                () => {setModalVisible(!modalVisible)
                                handleCancel() }
                                }>
                            <FontAwesome5 name="times" size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={{margin: 10, width: '100%', paddingLeft: 20, paddingRight: 20}}>
                            
                            <View style={{borderBottomWidth: 1, borderBottomColor: '#fff', marginBottom: 15, paddingBottom: 15}}>
                                <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#fff'}}>Total: {res != null ? res.symbol + res.total : ''} </Text>
                            </View>
                            
                            <View style={{padding: 10, marginBottom: 7, borderBottomWidth: 1, borderBottomColor: '#fff', paddingLeft: 10, flexDirection: 'row'}}>
                                <Text style={{color: '#fff', paddingRight: 7, fontSize: 18}}>Receiver:</Text>
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{res != null ? res.receiverName : ''} </Text>
                            </View>
                            <View style={{padding: 10, marginBottom: 7, borderBottomWidth: 1, borderBottomColor: '#fff', paddingLeft: 10, flexDirection: 'row'}}>
                                <Text style={{color: '#fff', paddingRight: 7, fontSize: 18}}>Account Number:</Text> 
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{res != null ? res.receiverAcct + ' (' + res.receiverAcctType + ')' : ''} </Text>
                            </View>
                            <View style={{padding: 10, marginBottom: 7, borderBottomWidth: 1, borderBottomColor: '#fff', paddingLeft: 10, flexDirection: 'row'}}>
                                <Text style={{color: '#fff', paddingRight: 7, fontSize: 18}}>Amount:</Text> 
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{res != null ? res.symbol + res.amount : ''} </Text>
                            </View>
                            <View style={{padding: 10, marginBottom: 7, borderBottomWidth: 1, borderBottomColor: '#fff', paddingLeft: 10, flexDirection: 'row'}}>
                                <Text style={{color: '#fff', paddingRight: 7, fontSize: 18}}>Transfer Charge:</Text> 
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{res != null ? res.symbol + res.charges : ''} </Text>
                            </View>
                            <View style={{padding: 10, marginBottom: 7, borderBottomWidth: 1, borderBottomColor: '#fff', paddingLeft: 10, flexDirection: 'row'}}>
                                <Text style={{color: '#fff', paddingRight: 7, fontSize: 18}}>Date:</Text> 
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{res != null ? res.transdate + ' ' + res.transctime : ''} </Text>
                            </View>
                            <View style={{padding: 10, marginBottom: 7, borderBottomWidth: 1, borderBottomColor: '#fff', paddingLeft: 10, flexDirection: 'row'}}> 
                                <Text style={{color: '#fff', paddingRight: 10, fontSize: 18}}>Desc: </Text> 
                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{res != null ? res.desc : ''} </Text>
                            </View>
                        </View>
                        <View style={{margin: 10}}>
                            <Text style={{color: 'white', fontSize: 17}}>Enter account pin to continue</Text>
                        </View>
                            <KeyboardAvoidingView>
                            <Formik
                                initialValues={pinValues}
                                onSubmit={(values, {setSubmitting}) => {
                                    if(values.accountPin == ''){
                                        handleMessageM("Please fill all fields");
                                        setSubmitting(false)
                                    }else{
                                        handleConfirm(values, setSubmitting);
                                    }
                                }}
                            >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                    <>
                                        <MyTextInput
                                            icon="lock"
                                            placeholder='Account Pin'
                                            value={values.accountPin}
                                            onChangeText={handleChange('accountPin')}
                                            style={[styles.textInput, {width: 300, marginBottom: 0}]}
                                            handleBlur={handleBlur('accountPin')}
                                            placeholderTextColor="#ffffff"
                                            secureTextEntry={hidePassword}
                                            isPassword={true}
                                            hidePassword={hidePassword}
                                            setHidePassword={setHidePassword}
                                        />
                                        <Text type={message} style={styles.msgBox}>{messageM}</Text>
                                        <View style={{alignItems: 'center'}}>
                                            {!isSubmitting && <TouchableOpacity style={{
                                                backgroundColor: "#fff",
                                                borderWidth: 1,
                                                width: 150,
                                                padding: 12,
                                                borderRadius: 5,
                                                marginTop: 0
                                            }} onPress={handleSubmit}>
                                                <Text style={{
                                                    color: '#2f3855',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }}>Confirm</Text>
                                            </TouchableOpacity>}
                                            {isSubmitting && <TouchableOpacity style={{
                                                backgroundColor: "#fff",
                                                borderWidth: 1,
                                                width: 150,
                                                padding: 12,
                                                borderRadius: 5,
                                                marginTop: 0
                                            }} disabled={true}>
                                                <ActivityIndicator size="large" color='#2f3855' />
                                            </TouchableOpacity>}
                                        </View>
                                    </>
                            )}
                            </Formik>
                            </KeyboardAvoidingView>
                        </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
  )
}

const MyTextInput = ({icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <View style={styles.leftIcon}>
                <FontAwesome5 name={icon} size={15} color='#ffffff' />
            </View>
            <TextInput {...props} />
            {isPassword && (
                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={18} color='#ffffff' />
                </TouchableOpacity>
            )}
        </View>
    )
}
export default SameBank