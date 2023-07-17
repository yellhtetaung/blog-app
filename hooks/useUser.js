import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../apis/user";

const useUserRegisterMutation = () => {
  return useMutation({
    mutationKey: ["post", "user"],
    mutationFn: registerUser,
  });
};

const useUserSignInMutation = () => {
  return useMutation({
    mutationKey: ["post", "login"],
    mutationFn: loginUser,
  });
};

export const useUser = () => {
  return {
    useUserRegisterMutation,
    useUserSignInMutation,
  };
};
