import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ActivityIndicator 
  } from 'react-native';

import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [email,setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)

    // const onClickLogin = () =>{
    //     setIsLoading(true)
    //     axios.post('https://resep-mau.herokuapp.com/api/login',{
    //         email:email,
    //         password : Password
    //     }).then(res => {
    //         setIsLoading(false)
    //         console.log(res.data)
    //         Alert.alert("sukses",res.data.data.name)
    //     }).catch(err => {
    //         setIsLoading(false)
    //        Alert.alert("errror","gagal login")
    //     }) 
    // }

    const onClickLogin = async () =>{
        setIsLoading(true)
        const response = await axios.post('https://resep-mau.herokuapp.com/api/login',{
            email:email,
            password : Password
        })
        .then(res => res)
        .catch(err => err.response) 
        setIsLoading(false)
        console.log(response)
        if(response.status===200){
            await saveToken(response.data.data.api_token)
            Alert.alert("sukses",response.data.data.name)
        }else{
            Alert.alert("errror",response.data.message)
        }
    }

    const saveToken = async (value) => {
        try {
          await AsyncStorage.setItem('userToken', value)
        } catch (e) {
          // saving error
        }
      }

  return (
    <View style={{backgroundColor:"green",padding:16}}> 
        <TextInput placeholder="email" style={{alignSelf:"stretch"}} onChangeText={(text)=>setEmail(text)}></TextInput>
        <TextInput placeholder="password" style={{alignSelf:"stretch"}} secureTextEntry={true} onChangeText={(pass)=>setPassword(pass)}></TextInput>
        {
            IsLoading? <ActivityIndicator size="small" color="blue"/> : <Button title="login" onPress={onClickLogin} disabled={IsLoading}></Button>
        }
        
    </View>
  );
}
