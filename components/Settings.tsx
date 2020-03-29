import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import colorBlindMode from '../classes/colorBlindMode';

export default class Settings extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      setColorBlindMode: props.setColorBlindMode,
      currentColorBlindMode: props.colorBlindMode
    }
  }
  render() {
    const { setColorBlindMode, currentColorBlindMode } = this.state;
    const styles = StyleSheet.create({
      title: {
        fontSize: 23,
        position: 'absolute',
        top: -75
      }
    })
    return (
      <View>
      <Text style={styles.title}>Accessibility</Text>
      <Text>Normal Mode</Text>
      <RadioButton
          value={colorBlindMode.normal}
          status={currentColorBlindMode === colorBlindMode.normal ? 'checked' : 'unchecked'}
          onPress={() => {
            this.setState({ currentColorBlindMode: colorBlindMode.normal });
            setColorBlindMode(colorBlindMode.normal)
          }}
        />
        <Text>Protanomaly Mode</Text>
        <RadioButton
            value={colorBlindMode.protanomaly}
            status={currentColorBlindMode === colorBlindMode.protanomaly ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ currentColorBlindMode: colorBlindMode.protanomaly });
              setColorBlindMode(colorBlindMode.protanomaly)
             }}
          />
          <Text>Deuteranomaly Mode</Text>
        <RadioButton
            value={colorBlindMode.deuteranomaly}
            status={currentColorBlindMode === colorBlindMode.deuteranomaly ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ currentColorBlindMode: colorBlindMode.deuteranomaly });
              setColorBlindMode(colorBlindMode.deuteranomaly)
            }}
          />
          <Text>Tritanomaly Mode</Text>
        <RadioButton
            value={colorBlindMode.tritanomaly}
            status={currentColorBlindMode === colorBlindMode.tritanomaly ? 'checked' : 'unchecked'}
            onPress={() => {
               this.setState({ currentColorBlindMode: colorBlindMode.tritanomaly });
               setColorBlindMode(colorBlindMode.tritanomaly)
              }}
          />

      </View>
    );
  }
}

export default Settings;
