import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
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

const SignUp = () => {
  const navigation = useNavigation();
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { useUserRegisterMutation } = useUser();
  const { mutateAsync: signUpUser, error } = useUserRegisterMutation();

  // Validation Schema
  const ValidationSchema = Yup.object({
    username: Yup.string()
      .min(2, "username must be above 3 characters.")
      .max(20, "username must be below 20 characters.")
      .required("Username must be required."),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email must be required."),
    password: Yup.string()
      .min(8)
      .max(12)
      .required("Password must be required.")
      .oneOf([Yup.ref("confirmPassword")], "Your password does not match"),
    confirmPassword: Yup.string()
      .min(8)
      .max(12)
      .required("Password must be required.")
      .oneOf([Yup.ref("password")], "Your password does not match."),
  });

  const renderIcon = ({ value, updateFun, props }) => {
    const { width: size, tintColor } = props.style;

    return (
      <TouchableOpacity onPress={() => updateFun(!value)}>
        <Ionicons
          name={value ? "eye-outline" : "eye-off-outline"}
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
    try {
      await signUpUser(
        {
          username: values.username,
          email: values.email,
          password: values.confirmPassword,
        },
        {
          onSuccess: async () => {
            await navigation.dispatch(StackActions.replace("home"));
            values.username = "";
            values.email = "";
            values.password = "";
            values.confirmPassword = "";
          },
          onError: () => {
            setModalVisible(true);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Animation Text
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
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <Layout style={styles.container}>
        <Animated.View style={reanimatedStyle}>
          <Text
            category={"h1"}
            status={"info"}
            style={{ textTransform: "uppercase" }}
          >
            Sign Up
          </Text>
        </Animated.View>

        <Formik
          initialValues={{
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
          }}
          validationSchema={ValidationSchema}
          onSubmit={onSubmitHandler}
        >
          {(props) => {
            const { values, handleChange, handleSubmit, errors, touched } =
              props;

            return (
              <Layout style={{ width: "100%", padding: 30 }}>
                <Input
                  value={values.username}
                  label={"Username"}
                  placeholder={"John"}
                  size={"large"}
                  style={{ marginVertical: 10 }}
                  onChangeText={handleChange("username")}
                  status={
                    touched.username && errors.username ? "danger" : "basic"
                  }
                  caption={() =>
                    errorText({
                      error: errors.username,
                      touched: touched.username,
                    })
                  }
                />

                <Input
                  value={values.email}
                  label={"Email"}
                  placeholder={"john@gmail.com"}
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
                  placeholder={"password"}
                  size={"large"}
                  style={{ marginVertical: 10 }}
                  onChangeText={handleChange("password")}
                  secureTextEntry={isShowPassword}
                  accessoryRight={(props) =>
                    renderIcon({
                      value: isShowPassword,
                      updateFun: setIsShowPassword,
                      props,
                    })
                  }
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

                <Input
                  value={values.confirmPassword}
                  label={"Confirm Password"}
                  placeholder={"password"}
                  size={"large"}
                  style={{ marginVertical: 10 }}
                  onChangeText={handleChange("confirmPassword")}
                  secureTextEntry={isShowConfirmPassword}
                  accessoryRight={(props) =>
                    renderIcon({
                      value: isShowConfirmPassword,
                      updateFun: setIsShowConfirmPassword,
                      props,
                    })
                  }
                  status={
                    touched.confirmPassword && errors.confirmPassword
                      ? "danger"
                      : "basic"
                  }
                  caption={() =>
                    errorText({
                      error: errors.confirmPassword,
                      touched: touched.confirmPassword,
                    })
                  }
                />

                <Button
                  size={"large"}
                  status={"info"}
                  style={{ marginVertical: 20 }}
                  onPress={() => handleSubmit()}
                >
                  Sign Up
                </Button>
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Already have an account?</Text>
                  <TouchableOpacity
                    style={{ marginHorizontal: 10 }}
                    onPress={() => navigation.navigate("sign-in")}
                  >
                    <Text status={"info"}>Sign in</Text>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
