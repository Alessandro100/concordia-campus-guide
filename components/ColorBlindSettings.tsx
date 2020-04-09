import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import colorBlindMode from '../classes/colorBlindMode';

export default class ColorBlindSettings extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      setColorBlindMode: props.setColorBlindMode,
      currentColorBlindMode: props.colorBlindMode,
      closeZeSettings: props.closeZeSettings
    }
  }
  render() {
    const { setColorBlindMode, currentColorBlindMode, closeZeSettings } = this.state;
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
            setColorBlindMode(colorBlindMode.normal);
            closeZeSettings();
          }}
        />
        <Text>Protanomaly Mode</Text>
        <RadioButton
            value={colorBlindMode.protanomaly}
            status={currentColorBlindMode === colorBlindMode.protanomaly ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ currentColorBlindMode: colorBlindMode.protanomaly });
              setColorBlindMode(colorBlindMode.protanomaly);
              closeZeSettings();
             }}
          />
          <Text>Deuteranomaly Mode</Text>
        <RadioButton
            value={colorBlindMode.deuteranomaly}
            status={currentColorBlindMode === colorBlindMode.deuteranomaly ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ currentColorBlindMode: colorBlindMode.deuteranomaly });
              setColorBlindMode(colorBlindMode.deuteranomaly);
              closeZeSettings();
            }}
          />
          <Text>Tritanomaly Mode</Text>
        <RadioButton
            value={colorBlindMode.tritanomaly}
            status={currentColorBlindMode === colorBlindMode.tritanomaly ? 'checked' : 'unchecked'}
            onPress={() => {
               this.setState({ currentColorBlindMode: colorBlindMode.tritanomaly });
               setColorBlindMode(colorBlindMode.tritanomaly);
               closeZeSettings();
              }}
          />

      </View>
    );
  }
}

export default ColorBlindSettings;
