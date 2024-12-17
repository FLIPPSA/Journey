import { Image, StyleSheet, Platform, View, Text } from 'react-native';

export default function NewPost() {
  return (
    <View style={styles.container}>
        <Text>New Post</Text>
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
