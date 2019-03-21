import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Permissions, Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';

import { MonoText } from '../components/StyledText';
import { getNews } from '../data/News';
import Article from '../components/Articles';

const PUSH_ENDPOINT = 'https://www.genesis-bde.fr/api/phone';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("------------------------------------------");
  console.log(token);
  console.log("------------------------------------------");
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
    }),
  });
}

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: [
        {
          "source": {
            "id": "techcrunch",
            "name": "TechCrunch"
          },
          "author": "Frederic Lardinois",
          "title": "Windows Virtual Desktop is now in public preview - TechCrunch",
          "description": "Last year, Microsoft announced the launch of its Windows Virtual Desktop service. At the time, this was a private preview, but starting today, any enterprise user who wants to try out what using a virtual Windows 10 desktop that’s hosted in the Azure cloud l, but starting today, any enterprise user who wants to try out what using a virtual Windows 10 desktop that’s hosted in the Azure cloud l, but starting today, any enterprise user who wants to try out what using a virtual Windows 10 desktop that’s hosted in the Azure cloud l, but starting today, any enterprise user who wants to try out what using a virtual Windows 10 desktop that’s hosted in the Azure cloud l, but starting today, any enterprise user who wants to try out what using a virtual Windows 10 desktop that’s hosted in the Azure cloud l, but starting today, any enterprise user who wants to try out what using a virtual Windows 10 desktop that’s hosted in the Azure cloud lo…",
          "url": "https://techcrunch.com/2019/03/21/windows-virtual-desktop-is-now-in-public-preview/",
          "urlToImage": "https://techcrunch.com/wp-content/uploads/2018/01/img_20180110_180644.jpg?w=533",
          "publishedAt": "2019-03-21T10:02:12Z",
        }
      ], refreshing: true
    };

    this.fetchNews = this.fetchNews.bind(this);
  }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));

  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
  }

  componentDidMount() {
    registerForPushNotificationsAsync()
    this.listener = Expo.Notifications.addListener(this.listen)
    this.fetchNews();
  }

  componentWillUnmount() {
    this.listener && Expo.Notifications.removeListener(this.listen)
  }

  listen = ({ origin, data }) => {
    console.log("cool data", origin, data);
  }


  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/couverture.jpg')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.container}>
            <FlatList
              data={this.state.articles}
              renderItem={({ item }) => <Article article={item} />}
              keyExtractor={item => item.url}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)}
            />
          </View>


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    marginTop: 0,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
