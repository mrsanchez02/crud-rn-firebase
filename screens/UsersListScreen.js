import React, { useEffect, useState } from "react";
import { db } from "../database/firebase";
import { collection, query } from "firebase/firestore";
import { ScrollView } from "react-native";
import { Button } from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import { onSnapshot } from "firebase/firestore";

const UsersListScreen = ({ navigation }) => {
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const { name, email, phone } = doc.data();
          users.push({
            id: doc.id,
            name,
            email,
            phone,
          });
        });
        setUserList(users);
      });
      console.log("List populed");
      return () => unsubscribe()
    } catch (error) {
      console.log("Error showing results: ", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const GoToUserDetails = (id) => {
    navigation.navigate("UserDetail", {
      userId: id,
    });
  };

  return (
    <ScrollView>
      <Button
        title="Create user"
        onPress={() => navigation.navigate("CreateUser")}
      />
      {userList &&
        userList.map((item) => (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => GoToUserDetails(item.id)}
          >
            <ListItem.Chevron />
            <Avatar source={{ uri: "https://picsum.photos/200" }} rounded />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
    </ScrollView>
  );
};

export default UsersListScreen;
