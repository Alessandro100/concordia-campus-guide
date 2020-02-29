import React, { Component } from 'react';
import Colors from '../constants/Colors';
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

class CampusToggleButton extends Component<{setMapLocation}> {

    state = {
        currentCampusView: 'SGW',
    };

    buttonStyling(campusSelected) {
        const { currentCampusView } = this.state;
        return {
            backgroundColor: (campusSelected == currentCampusView) ? Colors.primaryColor : Colors.grey,
            opacity: (campusSelected == currentCampusView) ? 1 : 0.7,
            padding: 7,
            width: 100,
        }
    }

    toggleCampusView(campusSelected) {
        const { setMapLocation } = this.props;
        const { currentCampusView } = this.state;
        if (currentCampusView == 'SGW' && campusSelected != 'SGW') {
            this.setState({ currentCampusView: 'Loyola' })
            setMapLocation(45.4582, -73.6405);
        } else if (currentCampusView == 'Loyola' && campusSelected != 'Loyola') {
            this.setState({ currentCampusView: 'SGW' })
            setMapLocation(45.497406, -73.577102);
        }
    }

    render() {
        return (
            <View style={styles.campusToggle}>
                <TouchableOpacity style={this.buttonStyling('SGW')} onPress={() => this.toggleCampusView('SGW')}>
                    <Text style={styles.buttonText}>SGW</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.buttonStyling('Loyola')} onPress={() => this.toggleCampusView('Loyola')}>
                    <Text style={styles.buttonText}>Loyola</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    campusToggle: {
        display: "flex",
        flexDirection: 'row',
        position: "absolute",
        top: 110,
        zIndex: 2,
        borderRadius: 10,
        overflow: "hidden"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default CampusToggleButton;