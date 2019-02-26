import React, {Component} from 'react';
import {
    Image, StyleSheet,
    View, Text,
    TouchableHighlight,
    Platform
} from 'react-native';
import Layout from '../constants/Layout';
import Modal from "./Modal";


export default class Member extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    render() {
        const {name, position, description, src = '../assets/images/members/default.jpg'} =                            this.props.memberInfo;

        return (
            <View>
                <Modal modalVisible={this.state.modalVisible} onToggle={this.toggleModal}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/members/default.jpg')}
                        resizeMode="contain"
                    />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.position}>{position.toUpperCase()}</Text>

                    <Text style={styles.description}>{description}</Text>
                </Modal>

                <TouchableHighlight onPress={this.toggleModal}>
                    <Image
                        style={styles.imagePreview}
                        source={require('../assets/images/members/default.jpg')}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    imagePreview: {
        width: (Layout.window.width) / 3,
        height: (Layout.window.width) / 3
    },
    image: {
        marginTop: 10,
        flex: 0.5,
        height: undefined,
        width: undefined
    },
    name: {
        marginTop: -20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    position: {
        marginTop: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '300',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
    },
    description: {
        marginTop: 50
    }
});