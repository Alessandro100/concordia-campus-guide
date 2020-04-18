import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CampusEvent from '../classes/CampusEvent';
import GoogleEventComponent from './GoogleEventComponent';
import * as Google from 'expo-google-app-auth';
import { REACT_APP_GOOGLE_AUTH_ANDROID_CLIENT_ID } from 'react-native-dotenv'

type GoogleEventContainerProps = {
};

type GoogleEventContainerState = {
};

class GoogleEventContainer extends Component<GoogleEventContainerProps, GoogleEventContainerState> {
   
    constructor(props) {
        super(props);
        this.state = {
        };
        const { type, accessToken, user } = await Google.logInAsync({
            androidClientId: REACT_APP_GOOGLE_AUTH_ANDROID_CLIENT_ID,
            scopes: ['profile', 'email', 'calendar']
        });
          
        if (type === 'success') {
            //`accessToken` is now valid and can be used to get data from the Google API with HTTP requests
            console.log(user);
        }
    }

    getNextClass(): CampusEvent{
        const title: string = '';
        const description: string = '';
        const startDate: Date = new Date();
        const endDate: Date = new Date();
        const location: string = '';
        return new CampusEvent(title, description, startDate, endDate, location);
    }

    render() {
        return (
        <View>
            <GoogleEventComponent campusEvent={ this.getNextClass() }></GoogleEventComponent>
        </View>
        );
    }
}
export default GoogleEventContainer;