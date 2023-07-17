import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Yup from "yup";
import { useUser } from "../hooks/useUser";
import { useDispatch } from "react-redux";
import { SIGN_IN } from "../features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const navigation = useNavigation();
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { useUserSignInMutation } = useUser();
  const { mutateAsync: signInUser, isError, error } = useUserSignInMutation();

  // Validation Schema
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email must be required."),
    password: Yup.string()
      .min(8)
      .max(12)
      .required("Password must be required."),
  });

  const renderIcon = (props) => {
    const { width: size, tintColor } = props.style;

    return (
      <TouchableOpacity
        onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
      >
        <Ionicons
          name={isSecureTextEntry ? "eye-outline" : "eye-off-outline"}
          size={size}
          color={tintColor}
        />
      </TouchableOpacity>
    );
  };

  const errorText = ({ error, touched }) => {
    if (error && touched) {
      return (
        <Text status={"danger"} category={"c1"}>
          {error}
        </Text>
      );
    }
  };

  const onSubmitHandler = async (values) => {
    await signInUser(
      { email: values.email, password: values.password },
      {
        onSuccess: async (data) => {
          dispatch(SIGN_IN(data));
          await navigation.dispatch(StackActions.replace("home"));
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify({ isAuthenticated: true, user: data })
          );
          values.email = "";
          values.password = "";
        },
      }
    ).catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isError === true) setModalVisible(true);
  }, [isError]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      opacity.value = withSpring(0);
      translateY.value = withSpring(-50);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      opacity.value = withSpring(1);
      translateY.value = withSpring(0);
    });
  }, []);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Layout style={styles.container}>
      <Animated.View style={reanimatedStyle}>
        <Text
          category={"h1"}
          status={"info"}
          style={{ textTransform: "uppercase" }}
        >
          Sign In
        </Text>
      </Animated.View>

      <Formik
        initialValues={{ email: null, password: null }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitHandler}
      >
        {(props) => {
          const { values, handleChange, handleSubmit, touched, errors } = props;

          return (
            <Layout style={{ width: "100%", padding: 30 }}>
              <Input
                value={values.email}
                label={"Email"}
                placeholder={"Enter your email"}
                size={"large"}
                style={{ marginVertical: 10 }}
                onChangeText={handleChange("email")}
                status={touched.email && errors.email ? "danger" : "basic"}
                caption={() =>
                  errorText({
                    error: errors.email,
                    touched: touched.email,
                  })
                }
              />

              <Input
                value={values.password}
                label={"Password"}
                placeholder={"Enter your password"}
                size={"large"}
                style={{ marginVertical: 10 }}
                onChangeText={handleChange("password")}
                secureTextEntry={isSecureTextEntry}
                accessoryRight={renderIcon}
                status={
                  touched.password && errors.password ? "danger" : "basic"
                }
                caption={() =>
                  errorText({
                    error: errors.password,
                    touched: touched.password,
                  })
                }
              />
              <Button
                size={"large"}
                status={"info"}
                style={{ marginVertical: 20 }}
                onPress={() => handleSubmit()}
              >
                Sign In
              </Button>
              <Layout
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => navigation.navigate("sign-up")}
                >
                  <Text status={"info"}>Sign up</Text>
                </TouchableOpacity>
              </Layout>
            </Layout>
          );
        }}
      </Formik>

      <Modal
        visible={modalVisible}
        backdropStyle={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <Card disabled={true}>
          <Text category={"s1"}>{error}</Text>
          <Button
            status={"danger"}
            style={{ marginVertical: 15 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            dismiss
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
