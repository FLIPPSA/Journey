import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import ProfileNavigation from '../../components/Navigation/ProfileNavigation';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
        <ProfileNavigation showBack={false}/>
        <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    }
});
