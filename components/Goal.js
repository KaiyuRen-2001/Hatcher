import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Tag from "@/components/Tag";

import Theme from "@/assets/theme";

export default function Goal({ name, catagory, confidence }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.catagory}>
          <Tag
            title={catagory}
            icon={
              <FontAwesome
                name="files-o"
                size={Theme.sizes.iconSmall}
                color={Theme.colors.iconPrimary}
              />
            }
          />
        </View>
      </View>
      <Image
        style={styles.eggPicture}
        resizeMode="contain"
        source={require("@/assets/confidence0.png")} // TODO do not hard code
      ></Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    // padding: 24,
    paddingVertical: 12,
    paddingLeft: 0,
    paddingRight: 32,
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  eggPicture: { width: "35%", aspectRatio: 1 },
  body: {
    flex: 1,
    height: 75,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textLarge,
  },
  catagory: {
    paddingLeft: 8,
    paddingTop: 4,
  },
});
