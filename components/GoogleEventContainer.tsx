import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CampusEvent from '../classes/CampusEvent';
import GoogleEventComponent from './GoogleEventComponent';

type GoogleEventContainerProps = {
};

type GoogleEventContainerState = {
};

class GoogleEventContainer extends Component<GoogleEventContainerProps, GoogleEventContainerState> {
   
    constructor(props) {
        super(props);
        this.state = {
        };
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