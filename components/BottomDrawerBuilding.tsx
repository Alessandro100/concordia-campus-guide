import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
    paddingRight: 2,
    paddingLeft: 4,
  },
  location: {
    color: Colors.grey,
    textAlign: 'left',
    fontStyle: 'italic',
    paddingRight: 4,
    paddingLeft: 4,
  },
  description: {
    fontSize: 17,
    color: Colors.black,
    textAlign: 'left',
    paddingRight: 4,
    paddingLeft: 4,
  },
  indoorBtn: {
    margin: 10,
  },
});

type BottomDrawerBuildingProps = {
  building: Building;
  displayInfo: boolean;
  displayBuildingInfo(building: Building, displayInfo: boolean): void;
  indoorDisplay(displayIndoor: boolean): void;
};

type BottomDrawerBuildingState = {
  building: Building;
  displayInfo: boolean;
};

const TAB_BAR_HEIGHT = 0;

class BottomDrawerBuilding extends Component<BottomDrawerBuildingProps, BottomDrawerBuildingState> {
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

  changeToIndoorView = (stat: boolean) => {
    const { indoorDisplay } = this.props;
    indoorDisplay(stat);
  };

  changeState() {
    const { displayInfo } = this.props;
    const { building } = this.props;
    this.setState({ displayInfo });
    this.setState({ building });
  }

  renderContent = (building: Building) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleBuilding}>{building.getName()}</Text>
        <Text style={styles.location}>
          Location: [{building.getLocation().getLatitude()}, {building.getLocation().getLongitude()}
          ]
        </Text>
        <View style={styles.indoorBtn}>
          <Button
            title="Indoor Navigation"
            color={Colors.primaryColor}
            onPress={() => this.changeToIndoorView(true)}
          />
        </View>
        <Text style={styles.description}>{building.getDescription()}</Text>
      </View>
    );
  };

  render() {
    const { building, displayInfo } = this.state;
    const { displayBuildingInfo } = this.props;
    if (displayInfo === true) {
      return (
        <BottomDrawer
          style={styles.contentContainer}
          containerHeight={600}
          offset={TAB_BAR_HEIGHT}
          downDisplay={500}
          startUp={false}
          onCollapsed={() => {
            displayBuildingInfo(building, false);
          }}
        >
          {this.renderContent(building)}
        </BottomDrawer>
      );
    }
    return null;
  }
}
export default BottomDrawerBuilding;
