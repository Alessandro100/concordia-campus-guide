import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CampusEvent from '../classes/CampusEvent';
import GoogleCalendarEventComponent from './GoogleCalendarEventComponent';
import * as Google from 'expo-google-app-auth';
import { REACT_APP_GOOGLE_AUTH_ANDROID_CLIENT_ID } from 'react-native-dotenv'

type GoogleCalendarEventContainerProps = {
};

type GoogleCalendarEventContainerState = {
    campusEvent: CampusEvent;
};

class GoogleCalendarEventContainer extends Component<GoogleCalendarEventContainerProps, GoogleCalendarEventContainerState> {
   
    constructor(props: GoogleCalendarEventContainerProps) {
        super(props);
        this.state = {
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
                global.signedIn = true;
                global.accessToken = result.accessToken;
                this.setState(this.state);
            }else {
                //Add handle for login failed.
                console.error("accessToken Invalid")
            }
            return result;
        }catch (e){
            console.log(e);
        }

    }

    getNextClass(){
        //this function assumes that the user is signed in.
        const calendarId = fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
                headers: { Authorization: `Bearer ${global.accessToken}` }
            })
            .then((response) => response.json())
            .then((json) => 
                json.items.forEach((element) => {
                    if(element.summary == "school"){
                        console.log(element.id);
                        //timeMin parameter is the lowerbound for endTime, therefore will return an event that is ongoing until it is done.
                        fetch('https://www.googleapis.com/calendar/v3/calendars/'+ element.id +'/events?singleEvents=true&orderBy=startTime&maxResults=1&timeMin='+ new Date().toISOString(), {
                            headers: { Authorization: `Bearer ${global.accessToken}` }
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
        if(global.signedIn == false){
            return (
                <View>
                    <Button title="sync calendar" onPress={ this.signin.bind(this) }></Button>
                </View>
            );
        }else if(this.state.campusEvent == null) {
            this.getNextClass();
            return (
                <View>
                    <Text>Fetching...</Text>
                </View>
            );
        }else{
            return (
                <View>
                    <GoogleCalendarEventComponent campusEvent={ this.state.campusEvent }></GoogleCalendarEventComponent>
                    <Button title="refresh" onPress={ () => this.getNextClass() }></Button>
                </View>
            );
        }
    }
}
export default GoogleCalendarEventContainer;