import { Platform, StyleSheet, Text, View } from 'react-native';

let MapView, Marker;

if (Platform.OS === 'web') {
  MapView = ({ children, style, ...props }) => (
    <View style={[styles.webPlaceholder, style]}>
      <Text style={styles.webText}>
        📍 Map is not available in web preview.
        {'\n'}Please run on a physical device or emulator.
      </Text>
    </View>
  );
  Marker = () => null;
} else {
  const NativeMap = require('react-native-maps');
  MapView = NativeMap.default;
  Marker = NativeMap.Marker;
}

const styles = StyleSheet.create({
  webPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export { MapView, Marker };

