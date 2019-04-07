import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';
import API from '../constants/API';
import { WebBrowser } from 'expo';

export default class Articles extends React.Component {
    render() {
        const {
            title,
            content,
            publicationDate,
            source,
            medias,
            location,
            url,
        } = this.props.articleInfo;
        const { noteStyle, featuredTitleStyle } = styles;
        const time = moment(publicationDate || moment.now()).fromNow();
        const defaultImg =
            'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

        return (
            <TouchableOpacity
                onPress={this._handleOpenWithWebBrowser}
            >
                <Card
                    featuredTitle={title}
                    featuredTitleStyle={featuredTitleStyle}
                    image={{
                        uri: API.media + medias || defaultImg
                    }}
                >

                    <Text style={{ marginBottom: 10 }}>
                        {content || 'Read More..'}
                    </Text>
                    <Divider style={{ backgroundColor: '#dfe6e9' }} />
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        <Text style={noteStyle}>{location}</Text>
                        <Text style={noteStyle}>{time}</Text>
                    </View>

                </Card>
            </TouchableOpacity>

        );
    }

    _handleOpenWithWebBrowser = () => {
        try{
            WebBrowser.openBrowserAsync(url);
        }
        catch(e){

        }
    }

}

const styles = {
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    featuredTitleStyle: {
        marginHorizontal: 5,
        textAlign: 'center',
        textShadowColor: '#00000f',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3
    }
};