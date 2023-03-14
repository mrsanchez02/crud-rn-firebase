import React, { useState } from 'react'
import { View, TextInput, ScrollView, StyleSheet } from 'react-native'
import { db } from '../database/firebase';
import { collection, addDoc } from "firebase/firestore"; 
import { Button, Icon } from '@rneui/base';

const CreateUserScreen = ({navigation}) => {
  const initialState = {
    name: '',
    email: '',
    phone: ''
  }

  const [user, setUser] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const handleTextChange = (name, value) => {
    setUser({
      ...user,
      [name]: value
    })
  }

  const SaveNewUser = async () => {
    setLoading(true)
    try {
      if (user.name.trim()==='' || user.phone.trim()==='' || user.email.trim()==='') {
        alert('All fields are required!')
        return
      }
      const docRef = await addDoc(collection(db, "users"), user);
      console.log("Document written with ID: ", docRef.id);
      setUser(initialState)
      navigation.navigate('UserList')
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false)
    }
  }

  return (
  <ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
      <TextInput placeholder='Name' value={user.name} onChangeText={(value) => handleTextChange('name', value)} />
    </View>
    <View style={styles.inputGroup}>
      <TextInput placeholder='Email' value={user.email} onChangeText={(value) => handleTextChange('email', value)} />
    </View>
    <View style={styles.inputGroup}>
      <TextInput placeholder='Phone' value={user.phone} onChangeText={(value) => handleTextChange('phone', value)} keyboardType={'number-pad'} />
    </View>
    <View>
      <Button title='Save' onPress={SaveNewUser} icon={<Icon name='save' color={'white'} />} loading={loading} />
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
})

export default CreateUserScreen