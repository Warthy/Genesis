import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';


export default class EventsScreen extends React.Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Bienvenue sur la page des évènements</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
