import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
import Building from '../classes/building';
import Colors from '../constants/Colors';
import CampusEventContainer from './CampusEventContainer';

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
});

type BottomDrawerBuildingProps = {
  building: Building;
  displayInfo: boolean;
  displayBuildingInfo(building: Building, displayInfo: boolean): void;
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
        <Text style={styles.description}>{building.getDescription()}</Text>
        <Text style={styles.description}>Extra description here . . .</Text>
        <Text>{'\n'}Today's Events:</Text>
        <CampusEventContainer buildingId={this.state.building.identifier}/>
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
