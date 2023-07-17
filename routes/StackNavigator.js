import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import BottomNavigator from "./BottomNavigator";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="sign-in"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="sign-in" component={SignIn} />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen name="home" component={BottomNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
