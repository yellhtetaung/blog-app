import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const store = useSelector((state) => state.auth);

  return (
    <Layout>
      <Button onPress={async () => await AsyncStorage.clear()}>Sign Out</Button>
    </Layout>
  );
};

export default Home;
