import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
import Building from '../classes/building';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: Colors.mapMarkerColor,
  },
  titleBuilding: {
    fontSize: 30,
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  location: {
    color: Colors.grey,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 17,
    color: Colors.black,
    textAlign: 'left',
  },
});

type displayInfoProps = {
  building: Building;
  displayInfo: boolean;
};

type displayInfoState = {
  building: Building;
  displayInfo: boolean;
};

const TAB_BAR_HEIGHT = 0;

class BottomDrawerBuilding extends Component<displayInfoProps, displayInfoState> {
  constructor(props) {
    super(props);
    const { building, displayInfo } = this.props;
    this.state = {
      building,
      displayInfo,
    };
  }

  componentDidUpdate(prevProps) {
    const { displayInfo } = this.props;
    if (displayInfo !== prevProps.displayInfo) {
      this.changeState();
    }
  }

  changeState() {
    const { displayInfo } = this.props;
    const { building } = this.props;
    this.setState({ displayInfo });
    this.setState({ building });
  }

  renderContent = (building: Building) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleBuilding}>{building.getDescription()}</Text>
        <Text style={styles.location}>
          Location: [{building.getLocation().getLatitude()}, {building.getLocation().getLongitude()}
          ]
        </Text>
        <Text style={styles.description}>
          insert description here: lorem sepsum blabalbaaddshfsdfsdfs sg dfg dfg hfgf ghgh dfgsdg 56
          dfg dtyr6u ghgdfg d{' '}
        </Text>
        <Text style={styles.description}>
          IT IS POSSIBLE TO ADD SCORLLVIEW IN THIS COMPONONET, REFER TO THIS:
          https://github.com/jacklein/rn-bottom-drawer
        </Text>
      </View>
    );
  };

  render() {
    const { building, displayInfo } = this.state;
    if (displayInfo === true) {
      return (
        <BottomDrawer
          style={styles.contentContainer}
          containerHeight={600}
          offset={TAB_BAR_HEIGHT}
          downDisplay={500}
          startUp={false}
          shadow
          roundedEdges
        >
          {this.renderContent(building)}
        </BottomDrawer>
      );
    }
    return null;
  }
}
export default BottomDrawerBuilding;
