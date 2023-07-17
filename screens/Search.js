import React from "react";
import { Layout, Input } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";

const Search = () => {
  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Input
        placeholder="Search"
        size="large"
        accessoryLeft={(props) => (
          <Feather
            name="search"
            size={props.style.height}
            color={props.style.tintColor}
          />
        )}
      />
    </Layout>
  );
};

export default Search;
