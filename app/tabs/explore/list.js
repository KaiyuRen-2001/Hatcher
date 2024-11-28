import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";

import useSession from "@/utils/useSession";

const STANFORD_COORDS = {
  latitude: 37.4275,
  longitude: -122.1697,
  title: "Women in Computer Science",
};

const JAPANTOWN_COORDS = {
  latitude: 37.7851,
  longitude: -122.4294,
  title: "San Francisco Japantown",
};

const BAY_AREA_REGION = {
  latitude: 37.6064,
  longitude: -122.2919,
  latitudeDelta: 0.8,
  longitudeDelta: 0.8,
};

const CustomCallout = ({ location }) => (
  <View style={styles.calloutContainer}>
    <Text style={styles.calloutTitle}>FLI students in CS</Text>
    <Text style={styles.calloutLocation}>Location: {location}</Text>
    <TouchableOpacity 
      style={styles.joinButton}
      // onPress={() => router.push("/tabs/explore/details")}
    >
      <Text style={styles.joinButtonText}>Join</Text>
    </TouchableOpacity>
  </View>
);

export default function ListGroups() {
  const session = useSession();

  if (!session) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={BAY_AREA_REGION}
      >
        <Marker
          coordinate={{
            latitude: STANFORD_COORDS.latitude,
            longitude: STANFORD_COORDS.longitude,
          }}
        >
          <MaterialIcons name="group" size={30} color="#FFA500" />
          <Callout tooltip={true} >
            <CustomCallout location="Stanford, CA" />
          </Callout>
        </Marker>
      <Marker
          coordinate={{
            latitude: JAPANTOWN_COORDS.latitude,
            longitude: JAPANTOWN_COORDS.longitude,
          }}
        >
          <MaterialIcons name="group" size={30} color="#FFA500" />
          <Callout tooltip={true} >
            <CustomCallout location="Stanford, CA" />
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: Theme.colors.backgroundPrimary,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    marginBottom: 5,
  },
  calloutLocation: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: Theme.colors.primary,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  customCallout: {
    backgroundColor: 'transparent',
    padding: 0,
  },
});
