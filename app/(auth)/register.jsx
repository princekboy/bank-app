import React, {useState, useContext} from 'react'
import { 
    SafeAreaView, 
    StatusBar, 
    View, 
    Text, 
    KeyboardAvoidingView, 
    TextInput, 
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Button,
    ScrollView
 } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../components/Credentials';

import {Octicons, Ionicons, Fontisto, FontAwesome} from '@expo/vector-icons';

import {Picker} from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker';

import mime from 'mime'


import styles from './register.style';

import axios from 'axios';

const initialValues = {
    fullname: '',
    photo: '',
    gender: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    dob: '',
    confirmPassword: ''
}

const RegScreen = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState('');
    const {storedCredentials, setStoredCredentials} = useContext(AuthContext);

    const router = useRouter();

      const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          aspect: [6, 6]
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        } else {
          handleMessage('You did not select any image.');
        }
      };

      const [dob, setDob] = useState();

      const [selectedGender, setSelectedGender] = useState();

        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
            setDob(currentDate);
        }

        const showDatePicker = () => {
            setShow(true);
        }
        
        const clearImg = () => {
            setSelectedImage(null);
        }

        const handleMessage = (message) => {
            setMessage(message)
        }

    

    const handleRegister = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://joenicehmp.com/l3git/dbo/register.php';

        const {fullname, photo, gender, username, phone, email, password, dob} = credentials;

        const newImageUri =  "file:///" + photo.split("file:/").join("");

        let formData = new FormData();

        let newDob = dob.toDateString();

        formData.append('fullname', fullname);
        formData.append('photo', {
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
           });
        formData.append('gender', gender);
        formData.append('username', username);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('dob', newDob.substring(0,15));
        
        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        axios
        .post(url, formData, config)
        .then(async (response) => {
            const result = response.data;
            let m = {};
            if(result.message == 'success'){
                m = {
                    u_id: result.u_id,
                    fullname: result.fullname,
                    token: result.token,
                    username: result.username,
                    email: result.email,
                    gender: result.gender,
                    phone: result.phone,
                    photo: result.photo,
                    dob: result.dob
                }
                handleMessage("Registration was successful")
                setTimeout(function(){
                    persistLogin({...m})
                }, 2000);
                console.log(m)
            }else{
                handleMessage("Registration failed")
            }
            setSubmitting(false)
        })
        .catch((error) => {
            console.log(error)
            setSubmitting(false);
            handleMessage("An error occured. Check your network and try again")
        })
        // console.log(credentials)
        // handleMessage(`Your Credentials \n ${credentials}`)
        // setSubmitting(false)
    }

    const persistLogin = (credentials) => {
        AsyncStorage
        .setItem('mybankapp', JSON.stringify(credentials))
        .then((result) => {
            alert("Successful")
            setStoredCredentials(credentials)
        })
        .catch((error) => {
            console.log(error)
            handleMessage('Persisting login failed')
        })
    }

  return (
    <SafeAreaView style={styles.fullscreen}>
            <StatusBar
                animated={false}
                backgroundColor="#24293e"
                barStyle="light-content"
                hidden={false}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#24293e",
                    },
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerTitle: "Mobile Banking",
                    headerShown: true,
                    headerTintColor: "#ffffff",
                    headerBackVisible: true
                }}
            />
            <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                <Text style={styles.loginHeader}>Register</Text>
                {
                show && (
                    <DateTimePicker 
                        testID='dateTimePicker'
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )
               }
               <Formik
                  initialValues={initialValues}
                  onSubmit={(values, {setSubmitting}) => {
                    values = {...values, dob: dob, gender: selectedGender, photo: selectedImage}
                    if(values.username == '' || values.phone == '' || values.gender == '' || values.email == '' || values.password == '' || values.fullname == '' || values.dob == '' || values.confirmPassword == ''){
                        handleMessage("Please fill all fields");
                        setSubmitting(false)
                    }else if(values.password != values.confirmPassword){
                        handleMessage('Passwords do not match')
                        setSubmitting(false)
                    }else if(values.photo == null || values.photo == ''){
                        handleMessage('Please select an image')
                        setSubmitting(false)
                    }
                    else{
                        handleRegister(values, setSubmitting);
                    }
                }}
              >
              {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                        {selectedImage && selectedImage.length > 0 ?
                            <View>
                                <Image source={{ uri: selectedImage }} 
                                style={styles.imgInput} />
                                <TouchableOpacity onPress={clearImg} style={styles.imgInputBtn}>
                                    <FontAwesome name="times" size={15} color="#ffffff" />
                                </TouchableOpacity>
                            </View>  : 
                        null }
                        {!selectedImage && 
                            <View>
                                <Image 
                                source={require('../../assets/images/avatar.png')} 
                                style={styles.imgInput} />
                                <TouchableOpacity onPress={pickImageAsync} style={styles.imgInputBtn} >
                                    <Ionicons name="pencil" size={15} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                        }
                        </View>
                    <MyTextInput
                        icon="person"
                        placeholder='Username'
                        value={values.username}
                        onChangeText={handleChange('username')}
                        style={styles.textInput}
                        handleBlur={handleBlur('username')}
                        placeholderTextColor="#ffffff"
                    />
                    <MyTextInput
                        icon="person"
                        placeholder='Fullname'
                        value={values.fullname}
                        onChangeText={handleChange('fullname')}
                        style={styles.textInput}
                        handleBlur={handleBlur('fullname')}
                        placeholderTextColor="#ffffff"
                    />
                    <MyTextInput
                        icon="mail"
                        placeholder='Email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        style={styles.textInput}
                        handleBlur={handleBlur('email')}
                        placeholderTextColor="#ffffff"
                        keyboardType="email-address"
                    />
                    <MyTextInput
                        icon="device-mobile"
                        placeholder='Phone Number'
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        style={styles.textInput}
                        handleBlur={handleBlur('phone')}
                        placeholderTextColor="#ffffff"
                    />

                    <Picker
                        selectedValue={selectedGender}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedGender(itemValue)
                        }
                        style={[styles.textInput, {borderWidth: 1, borderColor: '#ffffff'}]}
                        >
                        <Picker.Item label="--Select Gender--" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    
                    <MyTextInput
                          icon="calendar"
                          placeholder="YYYY-MM-DD"
                          placeholderTextColor='#ffffff'
                          onChangeText={handleChange('dob')}
                          onBlur={handleBlur('dob')}
                          value={dob ? dob.toDateString() : ''}
                          isDate={true}
                          editable={false}
                          style={styles.textInput}
                          showDatePicker={showDatePicker}
                      />
                      <MyTextInput
                        placeholder='Password'
                        icon="lock"
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        style={styles.textInput}
                    />
                    <MyTextInput
                        placeholder='Confirm Password'
                        icon="lock"
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        style={styles.textInput}
                    />
                    <Text type={message} style={styles.msgBox}>{message}</Text>
                    {!isSubmitting && <TouchableOpacity style={styles.buttonLight} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>}
                    {isSubmitting && <TouchableOpacity style={styles.buttonLight} disabled={true}>
                        <ActivityIndicator size="large" color='#ffffff' />
                    </TouchableOpacity>}
                    <View style={styles.bottomFlex}>
                        <Text style={[styles.bottomFlexItem, styles.textLight]}>Already have an account?? </Text>
                        <TouchableOpacity style={styles.bottomFlexItem} onPress={() => router.push('./login')}>
                            <Text style={{textAlign: 'right', color: '#fff', fontWeight: 'bold'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                )}
                </Formik>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const MyTextInput = ({icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={15} color='#ffffff' />
            </View>
            {!isDate && <TextInput {...props} />}
            {isDate && <TouchableOpacity onPress={showDatePicker}><TextInput {...props} /></TouchableOpacity>}
            {isPassword && (
                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={18} color='#ffffff' />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default RegScreen

