import { Image, StyleSheet, Platform, View, Text } from 'react-native';

export default function Tasklist() {
  return (
    <View style={styles.container}>
        <Text>Tasklist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
