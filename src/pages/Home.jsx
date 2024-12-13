import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import CheckboxField from '../components/Inputs/CheckboxField';

export default function Home() {
  return (
    <View style={styles.container}>
        <CheckboxField />
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
