import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { SIGN_IN } from "../features/authSlice";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default function StoreProvider({ children }) {
  const navigation = useNavigation();
  const getAuth = async () => {
    const res = await AsyncStorage.getItem("auth");
    const data = await JSON.parse(res);

    if (data?.isAuthenticated) {
      store.dispatch(SIGN_IN(data));
      navigation.dispatch(StackActions.replace("home"));
    }
  };

  // AsyncStorage.clear();

  useEffect(() => {
    getAuth();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
