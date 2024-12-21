import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlobScreen from './screens/BlobScreen';
import HomeScreen from './screens/Home';
import AddFile from './screens/AddFileScreen';
import UsersScreen from './screens/UsersScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Blob" component={BlobScreen} />
        <Stack.Screen name="AddFile" component={AddFile} />
        <Stack.Screen name="UsersScreen" component={UsersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

