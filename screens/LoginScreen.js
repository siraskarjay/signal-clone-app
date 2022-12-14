import { StyleSheet, View } from 'react-native'
import {Button, Input, Image} from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() =>{
      const unsubscribe =  auth.onAuthStateChanged((authUser) =>{
        console.log(authUser);
            if(authUser){
                navigation.replace("Home");
            }
        });

        return unsubscribe;
       
    },[]);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert (error));
    };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="light" />

      <Image source={{
        uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/2048px-Signal-Logo.svg.png",
      }} 
        style={{ width: 120, height: 120, borderRadius: 15, marginBottom: 30 }}
      />
      <View style={styles.inputContainer}>
      <Input 
      placeholder='Email' 
      autoFocus 
      type='email' 
      value={email} 
      onChangeText={(text) => setEmail(text)} 
      />
      <Input 
      placeholder='Password' 
      secureTextEntry 
      type='password' 
      value={password}
      onChangeText={(text) => setPassword(text)} 
      onSubmitEditing={signIn}
      />
      </View>
      <Button 
      containerStyle={styles.button}
      onPress={signIn}
      title='Login' />
      <Button 
      containerStyle={styles.button}
      onPress={() => navigation.navigate("Register")}
      type='outline'
      title='Register' />
      <View style={{height:-100}}></View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:'white',
    },

    inputContainer:{
        width: 300,
    },
    button:{
        width: 200,
        marginTop: 10,
    },
})