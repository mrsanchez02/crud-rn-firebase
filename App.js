import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import UserDetailScreen from './screens/UserDetailScreen';
import UsersListScreen from './screens/UsersListScreen';
import CreateUserScreen from './screens/CreateUserScreen';

const Stack = createStackNavigator()

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserList' component={UsersListScreen} options={{title: 'Users List'}}/>
      <Stack.Screen name='CreateUser' component={CreateUserScreen} options={{title: 'Create a New User'}}/>
      <Stack.Screen name='UserDetail' component={UserDetailScreen} options={{title: 'User Details'}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
