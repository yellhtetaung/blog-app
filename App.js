import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./routes/StackNavigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppState, LogBox, Platform, useColorScheme } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreProvider from "./store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  },
});

const App = () => {
  const colorscheme = useColorScheme();
  const onAppStateChange = (status) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  };

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colorscheme === "light" ? "#FFFFFF" : "#222B45",
        }}
      >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={colorscheme === "light" ? eva.light : eva.dark}
        >
          <NavigationContainer>
            <StoreProvider>
              <StackNavigator />
            </StoreProvider>
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
