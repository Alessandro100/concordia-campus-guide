import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import colorBlindMode from '../classes/colorBlindMode';

export default class Settings extends Component<{setColorBlindMode}> {
  constructor(props) {
    super(props);
    this.state = {
      setColorBlindMode: this.props.setColorBlindMode,
      currentColorBlindMode: this.props.currentColorBlindMode || colorBlindMode.normal
    }
  }
  render() {
    const { setColorBlindMode, currentColorBlindMode } = this.state;

    return (
      <View>
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
