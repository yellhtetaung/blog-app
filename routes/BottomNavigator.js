import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";

import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Post from "../screens/Post";
import Notification from "../screens/Notification";
import Search from "../screens/Search";

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="edit" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="bell" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
