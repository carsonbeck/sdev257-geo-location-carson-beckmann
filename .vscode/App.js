import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function WhereAmI() {
    const [region, setRegion] = useState(null);
    const [errMsg, setErrorMsg] = useState(null);

    const RESTAURANT = {
        title: "Zaxby's",
        description: "Fried Chicken Restaurant",
        latitude: 38.35680645691661,
        longitude: -85.70146682330127,
    };

    useEffect(() => {
        let watcher;

        async function setPosition({ coords: { latitude, longitude } }) {
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPosition(location);

            watcher = await Location.watchPositionAsync(
                { accuracy: Location.LocationAccuracy.Highest },
                setPosition
            );
        })();

        return () => {
            if (watcher) watcher.remove();
        };
    }, []);

    if (errMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{errMsg}</Text>
            </View>
        );
    }

    if (!region) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Getting your location...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                followsUserLocation={true}
                showsPointsOfInterest={false}
            >
                <Marker
                    coordinate={{
                        latitude: RESTAURANT.latitude,
                        longitude: RESTAURANT.longitude,
                    }}
                    title={RESTAURANT.title}
                    description={RESTAURANT.description}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1,
        width: "100%",
    },
    error: {
        color: "red",
        fontSize: 16,
    },
});