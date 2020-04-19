import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CampusEvent from '../classes/CampusEvent';
import GoogleEventComponent from './GoogleEventComponent';
import * as Google from 'expo-google-app-auth';
import { REACT_APP_GOOGLE_AUTH_ANDROID_CLIENT_ID } from 'react-native-dotenv'

type GoogleEventContainerProps = {
};

type GoogleEventContainerState = {
    signedIn: boolean;
    accessToken: string;
    campusEvent: CampusEvent;
};

class GoogleEventContainer extends Component<GoogleEventContainerProps, GoogleEventContainerState> {
   
    constructor(props: GoogleEventContainerProps) {
        super(props);
        this.state = {
            signedIn: false,
            accessToken: '',
            campusEvent: null
        };
    }
    async signin(): Promise<Google.LogInResult>{
        try{
            const result: Google.LogInResult = await Google.logInAsync({
                androidClientId: REACT_APP_GOOGLE_AUTH_ANDROID_CLIENT_ID,
                scopes: [
                    'profile',
                    'email',
                    'https://www.googleapis.com/auth/calendar.readonly'
                ]
            });
              
            if (result.type === 'success') {
                //`accessToken` is now valid and can be used to get data from the Google API with HTTP requests
                console.log("accessToken Valid");
                console.log(result.accessToken);
                this.setState({
                    signedIn: true,
                    accessToken: result.accessToken
                });
                this.getNextClass();
            }else {
                //Add handle for login failed.
                console.log("accessToken Invalid")
            }
            return result;
        }catch (e){
            console.log(e);
        }

    }

    getNextClass(){
        //this function assumes that the user is signed in.
        const calendarId = fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
                headers: { Authorization: `Bearer ${this.state.accessToken}` }
            })
            .then((response) => response.json())
            .then((json) => 
                json.items.forEach((element) => {
                    if(element.summary == "school"){
                        console.log(element.id);
                        //timeMin parameter is the lowerbound for endTime, therefore will return an event that is ongoing until it is done.
                        fetch('https://www.googleapis.com/calendar/v3/calendars/'+ element.id +'/events?singleEvents=true&orderBy=startTime&maxResults=1&timeMin='+ new Date().toISOString(), {
                            headers: { Authorization: `Bearer ${this.state.accessToken}` }
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json.items[0]);
                            const eventObject = json.items[0];
                            const title: string = eventObject.summary;
                            const description: string = eventObject.description;
                            const startDate: Date = eventObject.start.dateTime;
                            const endDate: Date = eventObject.end.dateTime;
                            const location: string = eventObject.location;
                            this.setState({campusEvent: new CampusEvent(title, description, startDate, endDate, location)});
                        })
                    }
                })
            );
        
    }

    render() {
        if(this.state.signedIn == false){
            return (
                <View>
                    <Button title="sign in" onPress={ this.signin.bind(this) }></Button>
                </View>
            );
        }else if(this.state.campusEvent == null) {
            return (
                <View>
                    <Text>Fetching...</Text>
                </View>
            );
        }else{
            return (
                <View>
                    <GoogleEventComponent campusEvent={ this.state.campusEvent }></GoogleEventComponent>
                    <Button title="refresh" onPress={ () => this.getNextClass() }></Button>
                </View>
            );
        }
    }
}
export default GoogleEventContainer;