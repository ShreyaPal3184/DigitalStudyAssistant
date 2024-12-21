import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimerScreen from "../screens/TimerScreen";
import HomeScreen from "../screens/HomeScreen";
import TaskScreen from "../screens/TaskScreen.js";
import SessionScreen from "../screens/SessionScreen";
import StudySessionScreen from "../screens/StudySessionScreen.js";
import { Background } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        position: "absolute",
        left: 20,
        right: 20,
        // marginEnd: 10,
        // marginStart: 10,
        elevation: 0,
        backgroundColor: "white",
        // borderRadius: 25,
        borderColor: 'blue',
        // borderTopRightRadius: 25 ,
        // borderTopLeftRadius: 25,
        height: 71,
        ...styles.shadow,
        paddingBottom: 10,  // Adjust this value to ensure the icon stays centered vertically
      },
      tabBarActiveTintColor: 'blue',    // Active tab color
      tabBarInactiveTintColor: '#aaa',  // Inactive tab color
      tabBarLabelStyle: {
        fontSize: 18,                 // Label font size
        fontWeight: 'bold',           // Label font weight
      },
      tabBarIconStyle: {
        justifyContent: 'center',    // Vertically center the icons
        alignItems: 'center',        // Horizontally center the icons
      },
      tabBarButton: (props) => (
        <TouchableOpacity {...props} activeOpacity={1} /> // Removes ripple effect
      ),
    }}
  >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} /> // Using AntDesign's "home" icon
          ),
        }}
      />

      <Tab.Screen
        name="Session"
        component={SessionScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/self-directed-learning.png')}
                resizeMode= "contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          )
        }}
      />

      <Tab.Screen
         name = "Start a Session"
         component={StudySessionScreen}
         options={{
          headerShown: true,
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/plus.png')}
                resizeMode="contain"
                style={{
                  width: 75,
                  height: 75,
                }}
              />
            </View>
          ),
          tabBarLabel: '',
          
         }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/clipboard.png')}
                resizeMode= "contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ) 
        }}
      />

      <Tab.Screen
        name="Community"
        component={TimerScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/people.png')}
                resizeMode= "contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '75FDF0',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6 ,
    elevation: 5,

  }
})

export default Tabs;
