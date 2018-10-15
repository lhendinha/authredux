import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { CardSection, Header, Button, Spinner } from './components/commom';
import LoginForm from './components/LoginForm';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBY5Z3OKNz_78pMPZUmFC-NIKvFRH2GK7s",
      authDomain: "auth-9b54a.firebaseapp.com",
      databaseURL: "https://auth-9b54a.firebaseio.com",
      projectId: "auth-9b54a",
      storageBucket: "auth-9b54a.appspot.com",
      messagingSenderId: "666616173674"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button
              onPress={() => firebase.auth().signOut()}>
              Log Out
           </Button>
          </CardSection >
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}