import { Image, StyleSheet, Platform, View, Text } from 'react-native';

export default function Chat() {
  return (
    <View style={styles.container}>
        <Text>Chat</Text>
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
