import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import TaskCard from '../components/Cards/TaskCard';

export default function Home() {
  return (
    <View style={styles.container}>
        <TaskCard />
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
