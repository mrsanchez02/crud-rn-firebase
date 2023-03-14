import { Button, Icon } from "@rneui/base";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, Modal, Alert, Text, Pressable } from "react-native";
import { db } from "../database/firebase";

const UserDetailScreen = (props) => {
  const userId = props.route.params.userId;

  const [updateUser, setUpdateUser] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const getUserById = async (id) => {
    setLoading(true)
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUpdateUser({...docSnap.data(), id: docSnap.id});
      } else {
        alert("No such document!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const deleteUserById = async (id) => {
    setLoading(true)
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      alert('No such user!')
    } finally {
      setLoading(false)
      props.navigation.navigate('UserList')
    }
  }

  const updateUserById = async (id) => {
    setLoading(true)
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, updateUser);
    } catch (error) {
      alert('NO such document!')
      return
    } finally {
      setLoading(false)
      props.navigation.navigate('UserList')
    }
  }

  useEffect(() => {
    getUserById(userId);
  }, []);

  const handleTextChange = (name, value) => {
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          value={updateUser.name}
          onChangeText={(value) => handleTextChange("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          value={updateUser.email}
          onChangeText={(value) => handleTextChange("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          value={updateUser.phone}
          onChangeText={(value) => handleTextChange("phone", value)}
          keyboardType={'number-pad'}
        />
      </View>
      <View style={styles.btnGroup}>
        <Button
          radius="sm"
          title="Update"
          onPress={() => updateUserById(userId)}
          color="primary"
          icon={<Icon name="save" color={"white"} />}
          titleStyle={{ marginHorizontal: 5 }}
          loading={loading}
        />
        <Button
          radius="sm"
          title="Delete"
          onPress={() => setModalVisible(true)}
          color="warning"
          icon={<Icon name="delete" color={"white"} />}
          titleStyle={{ marginHorizontal: 5 }}
          loading={loading}
        />
      </View>
      {/* Delete Modal here */}
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete?</Text>
            <View style={styles.btnGroupModal}>
              <Button
                radius="sm"
                title="Delete"
                onPress={() => deleteUserById(userId)}
                color="error"
                icon={<Icon name="delete" color={"white"} />}
                titleStyle={{ marginHorizontal: 5 }}
                loading={loading}
              />
              <Button
                radius="sm"
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
                color="primary"
                icon={<Icon name="close" color={"white"} />}
                titleStyle={{ marginHorizontal: 5 }}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btnGroup: { 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-around" 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnGroupModal: {
    flexDirection: 'row',
    gap: 10,
  }
});

export default UserDetailScreen;
